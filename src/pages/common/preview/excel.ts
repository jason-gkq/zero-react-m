import * as Excel from 'exceljs/dist/exceljs';
import tinycolor from 'tinycolor2';
import { cloneDeep } from '@szero/utils';
import { getDarkColor, getLightColor } from './color';
import dayjs from 'dayjs';
// find
const themeColor = [
  '#FFFFFF',
  '#000000',
  '#BFBFBF',
  '#323232',
  '#4472C4',
  '#ED7D31',
  '#A5A5A5',
  '#FFC000',
  '#5B9BD5',
  '#71AD47',
];

// function getIteratee() {
//     var result = lodash.iteratee || iteratee;
//     result = result === iteratee ? baseIteratee : result;
//     return arguments.length ? result(arguments[0], arguments[1]) : result;
//   }
// function createFind(findIndexFunc) {
//     return function(collection, predicate, fromIndex) {
//       var iterable = Object(collection);
//       if (!isArrayLike(collection)) {
//         var iteratee = getIteratee(predicate, 3);
//         collection = keys(collection);
//         predicate = function(key) { return iteratee(iterable[key], key, iterable); };
//       }
//       var index = findIndexFunc(collection, predicate, fromIndex);
//       return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
//     };
//   }

let defaultColWidth = 80;
const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function find(arr: any, fuc: any) {
  let obj: any = {};
  for (let i = 0; i < arr.length; i++) {
    if (fuc(arr[i])) {
      obj = arr[i];
      break;
    }
  }
  return obj;
}

export function getUrl(src: any) {
  if (typeof src === 'string') {
    return src;
  } else if (src instanceof Blob) {
    return URL.createObjectURL(src);
  } else if (src instanceof ArrayBuffer) {
    return URL.createObjectURL(new Blob([src]));
  } else if (src instanceof Response) {
    return URL.createObjectURL((src as any).blob());
  } else {
    return src;
  }
}

export function getData(src: any, options = {}) {
  return fetchExcel(getUrl(src), options);
}

function fetchExcel(src: any, options = {}) {
  return fetch(src, options).then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res);
    }
    return res.arrayBuffer();
  });
}

export function readExcelData(buffer: ArrayBuffer) {
  try {
    const wb = new Excel.Workbook();
    return wb.xlsx.load(buffer);
  } catch (e) {
    console.warn(e);
    return Promise.reject(e);
  }
}

function transferColumns(excelSheet: any, spreadSheet: any, options: any) {
  for (let i = 0; i < (excelSheet.columns || []).length; i++) {
    spreadSheet.cols[i.toString()] = {};
    if (excelSheet.columns[i].width) {
      spreadSheet.cols[i.toString()].width = excelSheet.columns[i].width * 6;
    } else {
      spreadSheet.cols[i.toString()].width = defaultColWidth;
    }
  }

  spreadSheet.cols.len = Math.max(
    Object.keys(spreadSheet.cols).length,
    options.minColLength || 0
  );
}

function getCellText(cell: any) {
  //console.log(cell);
  const { numFmt, value, type } = cell;
  switch (type) {
    case 2: //数字
      return value + '';
    case 3: //字符串
      return value;
    case 4: //日期
      switch (numFmt) {
        case 'yyyy-mm-dd;@':
          return dayjs(value).format('YYYY-MM-DD');
        case 'mm-dd-yy':
          return dayjs(value).format('YYYY/MM/DD');
        case '[$-F800]dddd, mmmm dd, yyyy':
          return dayjs(value).format('YYYY年M月D日 ddd');
        case 'm"月"d"日";@':
          return dayjs(value).format('M月D日');
        case 'yyyy/m/d h:mm;@':
        case 'm/d/yy "h":mm':
          return dayjs(value).subtract(8, 'hour').format('YYYY/M/DD HH:mm');
        case 'h:mm;@':
          return dayjs(value).format('HH:mm');
        default:
          return dayjs(value).format('YYYY-MM-DD');
      }

    case 6: //公式
      return cell.result;
    case 8: //富文本
      return cell.text;
    default:
      return value;
  }
}
function transferArgbColor(originColor: any) {
  if (typeof originColor === 'object') {
    return '#000000';
  }
  if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(originColor)) {
    return originColor.startsWith('#') ? originColor : '#' + originColor;
  }
  originColor = originColor.trim().toLowerCase(); //去掉前后空格
  let color: any = {};
  try {
    let argb: any =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(originColor);
    color.r = parseInt(argb[2], 16);
    color.g = parseInt(argb[3], 16);
    color.b = parseInt(argb[4], 16);
    color.a = parseInt(argb[1], 16) / 255;
    return tinycolor(
      `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    ).toHexString();
  } catch (e) {
    console.warn(e);
  }
}
function transferThemeColor(themeIndex: any, tint: any) {
  if (themeIndex > 9) {
    return '#C7C9CC';
  }
  if (typeof tint === 'undefined') {
    return themeColor[themeIndex];
  } else if (tint > 0) {
    return getLightColor(themeColor[themeIndex], tint);
  } else {
    return getDarkColor(themeColor[themeIndex], Math.abs(tint));
  }
}
function getStyle(cell: any) {
  cell.style = cloneDeep(cell.style);
  let backGroundColor = null;
  if (cell.style.fill && cell.style.fill.fgColor) {
    // 8位字符颜色先转rgb再转16进制颜色
    if (cell.style.fill.fgColor.argb) {
      backGroundColor = transferArgbColor(cell.style.fill.fgColor.argb);
    } else if (cell.style.fill.fgColor.hasOwnProperty('theme')) {
      backGroundColor = transferThemeColor(
        cell.style.fill.fgColor.theme,
        cell.style.fill.fgColor.tint
      );
    } else {
      backGroundColor = '#C7C9CC';
    }
  }

  if (backGroundColor) {
    cell.style.bgcolor = backGroundColor;
  }
  //*************************************************************************** */

  //*********************字体存在背景色******************************
  // 字体颜色
  let fontColor = null;
  if (cell.style.font && cell.style.font.color) {
    if (cell.style.font.color.argb) {
      fontColor = transferArgbColor(cell.style.font.color.argb);
    } else if (cell.style.font.color.hasOwnProperty('theme')) {
      fontColor = transferThemeColor(
        cell.style.font.color.theme,
        cell.style.font.color.tint
      );
    } else {
      fontColor = '#000000';
    }
  }
  if (fontColor) {
    cell.style.color = fontColor;
  }

  // exceljs 对齐的格式转成 x-date-spreedsheet 能识别的对齐格式
  if (cell.style.alignment) {
    if (cell.style.alignment.horizontal) {
      cell.style.align = cell.style.alignment.horizontal;
    }
    if (cell.style.alignment.vertical) {
      cell.style.valign = cell.style.alignment.vertical;
    }
  }
  if (cell.style.alignment && cell.style.alignment.wrapText) {
    cell.style.textwrap = true;
  }

  if (cell.style.border) {
    let styleBorder: any = {};
    Object.keys(cell.style.border).forEach((position) => {
      let originBorder = cell.style.border[position];
      let bordColor = '#000000';

      if (typeof originBorder.color === 'string') {
        bordColor = originBorder.color;
      } else if (originBorder.color) {
        if (originBorder.color.argb) {
          bordColor = transferArgbColor(originBorder.color.argb);
        } else if (originBorder.color.hasOwnProperty('theme')) {
          bordColor = transferThemeColor(
            originBorder.color.theme,
            originBorder.color.tint
          );
        }
      }
      styleBorder[position] = [originBorder.style || 'thin', bordColor];
    });
    cell.style.border2 = { ...cell.style.border };
    cell.style.border = styleBorder;
  }

  return cell.style;
}

export function transferExcelToSpreadSheet(workbook: any, options: any) {
  let workbookData: any = [];
  //console.log(workbook, 'workbook')
  workbook.eachSheet((sheet: any) => {
    //console.log(sheet,'sheet');
    // 构造x-data-spreadsheet 的 sheet 数据源结构
    let sheetData: any = {
      name: sheet.name,
      styles: [],
      rows: {},
      cols: {},
      merges: [],
      media: [],
    };
    // 收集合并单元格信息
    let mergeAddressData: any = [];
    for (let mergeRange in sheet._merges) {
      sheetData.merges.push(sheet._merges[mergeRange].shortRange);
      let mergeAddress: any = {};
      // 合并单元格起始地址
      mergeAddress.startAddress = sheet._merges[mergeRange].tl;
      // 合并单元格终止地址
      mergeAddress.endAddress = sheet._merges[mergeRange].br;
      // Y轴方向跨度
      mergeAddress.YRange =
        sheet._merges[mergeRange].model.bottom -
        sheet._merges[mergeRange].model.top;
      // X轴方向跨度
      mergeAddress.XRange =
        sheet._merges[mergeRange].model.right -
        sheet._merges[mergeRange].model.left;
      mergeAddressData.push(mergeAddress);
    }

    transferColumns(sheet, sheetData, options);
    // 遍历行
    (sheet._rows || []).forEach((row: any, spreadSheetRowIndex: any) => {
      sheetData.rows[spreadSheetRowIndex] = { cells: {} };

      if (row.height) {
        sheetData.rows[spreadSheetRowIndex].height = row.height;
      }
      //includeEmpty = false 不包含空白单元格
      (row._cells || []).forEach((cell: any, spreadSheetColIndex: any) => {
        sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex] = {};

        let mergeAddress = find(mergeAddressData, function (o: any) {
          return o.startAddress == cell._address;
        });
        if (mergeAddress && cell.master.address != mergeAddress.startAddress) {
          return;
        }
        if (mergeAddress) {
          sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].merge =
            [mergeAddress.YRange, mergeAddress.XRange];
        }
        sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].text =
          getCellText(cell);
        sheetData.styles.push(getStyle(cell));
        sheetData.rows[spreadSheetRowIndex].cells[spreadSheetColIndex].style =
          sheetData.styles.length - 1;
      });
    });
    if (sheetData._media) {
      sheetData.media = sheetData._media;
    }
    sheetData.rows.len = Math.max(Object.keys(sheetData.rows).length, 100);
    workbookData.push(sheetData);
  });
  //console.log(workbookData, 'workbookData')
  return {
    workbookData,
    workbookSource: workbook,
    medias: workbook.media || [],
  };
}
