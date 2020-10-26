import React, {Component} from 'react'
import EngineGame from '../EngineGame/EngineGame'
import styles from './Home.module.css'
import Header from "../../components/Heder/Header";
import {connect} from "react-redux";

class Home extends Component {

    render() {
        return (
            <>
                <Header/>
                <div className={styles.container}>
                    <EngineGame/>
                    <div className={styles.points}>
                        {this.props.points}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {points: state.gameMechanics.points}
};

export default connect(mapStateToProps, null)(Home);