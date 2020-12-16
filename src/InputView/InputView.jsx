import React, { Component } from 'react';


class InputView extends Component {
    
    render() {

        return (
            <div id="input-view-root">

                <label htmlFor="pos-nums">Deposits</label>
                <input type="text" name="pos-nums" id="pos-nums"/>
                <button
                    id="pos-nums-add-btn" 
                    onClick={() => this.props.addPosNum()}
                >+</button>

                <list>
                    {this.props.posNums}
                </list>

                <label htmlFor="neg-nums">Withdrawls</label>
                <input type="text" name="neg-nums" id="neg-nums"/>
                <button
                    id="neg-nums-add-btn"
                    onClick={() => this.props.addNegNum()}
                >+</button>

                <list>
                    {this.props.negNums}
                </list>

                <label htmlFor="goal-nums">Goal Ammounts</label>
                <input type="text" name="goal-nums" id="goal-nums"/>
                <button
                    id="goal-nums-add-btn"
                    onClick={() => this.props.addGoalNum()}
                >+</button>

                <list>
                    {this.props.goalNums}
                </list>

                <button
                    id="calc-btn"
                    onClick={() => this.props.calcNums()}
                >Calculate</button>

                <list>
                    {this.props.calcLists}
                </list>

                <p>VALUES</p>
                <list>
                    {this.props.vs}
                </list>

            </div>
        )
    }
}

export default InputView;