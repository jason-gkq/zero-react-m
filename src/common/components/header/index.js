import React, {Component} from "react";
import * as styles from "./index.less";
import backBlack from '@assets/img/back-black.svg';

class Header extends Component {
    constructor(props) {
		super(props);
		this.state = {
		};
	}
    render(){
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerContentBtns}>
                            <img src={backBlack} className={styles.headerIcon}/>
                        </div>
                        <div className={styles.headerContentTitle}>头部标题</div>
                        <div className={[styles.headerContentBtns,styles.headerRight]}></div>
                    </div>
                </div>
                <div className={styles.headerPlaceholder}></div>
            </div>
        )
    }
}

export default Header;