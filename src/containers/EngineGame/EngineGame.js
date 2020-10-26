import React, {Component} from 'react'
import styles from './EngineGame.module.css'
import {connect} from 'react-redux';
import {removePoints, setPoints} from '../../store/actions/gameMechanics';

const color = ['#384999', '#b36b30', '#5d72df', '#2592bd', '#c3a336']

class EngineGame extends Component {
    state = {
        chessboard: null,
        lockButton: false
    }

    componentDidMount() {
        this.generateChessboard(16, 8)
    }

    generateChessboard = (columnNumber, verseNumber) => {
        const newChessboard = new Array(columnNumber).fill(new Array(verseNumber).fill(1))

        this.setState({
            chessboard: newChessboard.map((val) => {
                return (val.map((_) => {
                    return (this.randomColor())
                }))
            })
        })
    }

    randomColor = () => {
        return Math.floor(Math.random() * (5));
    }

    clickRectangle = (columnNumber, verseNumber, val) => {
        if (!this.state.lockButton) {
            const removeRectange = this.searchRectagle(columnNumber, verseNumber, val, '', [])
            if (removeRectange.length > 1) {
                this.setState({lockButton:true})
                this.removeRectangles(removeRectange)
            }
        }
    }

    searchRectagle = (columnNumber, verseNumber, val, direction, removeRectange) => {
        const {chessboard} = this.state
        if (removeRectange.length === 0 || removeRectange.reduce((previousValue, currentValue, i) => {
            if (i === 1) {
                if (previousValue.columnNumber === columnNumber && previousValue.verseNumber === verseNumber)
                    return false
            }
            if (currentValue.columnNumber === columnNumber && currentValue.verseNumber === verseNumber)
                return false
            if (previousValue)
                return true
            return previousValue
        })) {
            removeRectange.push({columnNumber, verseNumber})
            if (direction !== 'Dn' && chessboard[columnNumber] && chessboard[columnNumber][verseNumber + 1] === val) {
                removeRectange = this.searchRectagle(columnNumber, verseNumber + 1, val, 'Up', removeRectange)
            }
            if (direction !== 'Up' && chessboard[columnNumber] && chessboard[columnNumber][verseNumber - 1] === val) {
                removeRectange = this.searchRectagle(columnNumber, verseNumber - 1, val, 'Dn', removeRectange)
            }

            if (direction !== 'Left' && chessboard[columnNumber + 1] && chessboard[columnNumber + 1][verseNumber] === val) {
                removeRectange = this.searchRectagle(columnNumber + 1, verseNumber, val, 'Right', removeRectange)
            }
            if (direction !== 'Right' && chessboard[columnNumber - 1] && chessboard[columnNumber - 1][verseNumber] === val) {
                removeRectange = this.searchRectagle(columnNumber - 1, verseNumber, val, 'Left', removeRectange)
            }
        }
        return (removeRectange)
    }

    removeRectangles = (removeRectange) => {
        const newChessboard = this.state.chessboard
        this.state.chessboard.sort((a, b) => (a.verseNumber - b.verseNumber)).map((_, i) => {
            const rectanglesColumn = removeRectange.filter(val => val.columnNumber === i)

            rectanglesColumn.map((val, i) => {
                newChessboard[val.columnNumber][val.verseNumber + i] = 'remove'
                return(newChessboard[val.columnNumber].unshift(this.randomColor()))
            })
            return(setTimeout(() => {
                rectanglesColumn.map((val, i) => {
                    const removeIndex = newChessboard[val.columnNumber].indexOf('remove')
                    return(newChessboard[val.columnNumber].splice(removeIndex, 1))
                })
                this.setState({lockButton:false})
            }, 400))
        })
        setTimeout(() => {
            this.checkingOut()
            this.setState({lockButton:false})
        }, 400)
        this.props.setPoints(removeRectange.length)
        this.setState({chessboard: newChessboard})
    }

    newGame=()=>{
        this.generateChessboard(16, 8)
        this.props.removePoints()
    }

    checkingOut=()=>{
        const {chessboard}=this.state
        const possibilityMovement =chessboard.some((columnVal,column) => {
            return columnVal.some((val,verse)=>{
                if(chessboard[column][verse + 1] && val===chessboard[column][verse + 1])
                    return true
                else if(chessboard[column+1] && val===chessboard[column+1][verse])
                    return true
                return false
            })
        });
        if(!possibilityMovement)
            alert("You won the game")
    }

    render() {
        const {chessboard} = this.state
        return (
            <div>
                <button onClick={this.newGame} className={styles.buttonNewGame}>New game</button>
                {chessboard && <div className={styles.chessboard}>
                    {chessboard.map((column, columnNumber) => (
                        <div key={columnNumber}>
                            {column.map((val, verseNumber) => (
                                <div
                                    key={verseNumber}
                                    onClick={() => this.clickRectangle(columnNumber, verseNumber, val)}
                                    className={val !== 'remove' ? styles.rectangle : styles.remove}
                                    style={{
                                        backgroundColor: val !== 'remove' && color[val],
                                    }}/>
                            ))}
                        </div>
                    ))}
                </div>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removePoints: (readerObject) => dispatch(removePoints(readerObject)),
        setPoints: (readerObject) => dispatch(setPoints(readerObject))
    }
};

export default connect(null, mapDispatchToProps)(EngineGame);