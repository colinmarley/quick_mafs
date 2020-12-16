import React, { Component } from 'react';
import InputView from './InputView';


let copyArray = (arr1) => {
    let arr2 = [];
    for (let i = 0; i < arr1.length; i ++) {
        arr2.push(arr1[i]);
    }
    return arr2;
}

let removeSign = (num) => {
    if (num[0] == "-") {
        num = num.substring(1);
    }
    return num;
}

class InputHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            negNums: [],
            posNums: [],
            calcLists: [],
            goals: [],
            vs: []
        }
    }

    renderNumbers(nums, type="") {
        let listItems = [];
        for(let i = 0; i < nums.length; i ++) {
            listItems.push(<li key={i+type}>{nums[i]}</li>);
        }
        return listItems;
    }

    addNegNum() {
        let nums = this.state.negNums;
        let ns= document.getElementById("neg-nums").value.split(' ');
        for (let i = 0; i < ns.length; i ++) {
            let val = removeSign(ns[i]);
            nums.push(-parseFloat(val));
        }
        this.setState({
            negNums: nums,
        });
    }

    addPosNum() {
        let nums = this.state.posNums;
        let ns = document.getElementById("pos-nums").value.split(' ');
        for (let i = 0; i < ns.length; i ++) {
            let val = ns[i];
            nums.push(parseFloat(val));
        }
        this.setState({
            posNums: nums,
        });
    }

    addGoalNum() {
        let goals = this.state.goals;
        let ns = document.getElementById("goal-nums").value.split(' ');
        for (let i = 0; i < ns.length; i ++) {
            let val = ns[i];
            goals.push(parseFloat(val));
        }
        this.setState({
            goals: goals
        });
    }

    calcNums() {

        let x = this.state.posNums.concat(this.state.negNums);
        for (let i = 0; i < this.state.goals.length; i ++) {
            console.log(`Find values for : ${this.state.goals[i]}`);
            console.log(`Out of ${x}`);
            let res = this.tryValue(x, this.state.goals[i], 0, parseFloat('0.00'), []);
            console.log(res)
        }
    }

    tryValue(nums, goal, i, total, usedNums) {

        if (i === nums.length) {
            return [];
        }

        let value = nums[i];

        let totalA = total;
        let totalB = total + value;

        let usedNumsA = copyArray(usedNums);
        usedNums.push(value.toFixed(2));
        let usedNumsB = copyArray(usedNums);

        if (totalB.toFixed(2) == goal.toFixed(2)) {
            let x = this.state.vs;
            x.push(<li>{`$${goal.toFixed(2)}: $${usedNumsB.join(", $")}`}</li>);
            this.setState({
                vs: x,
            });
        } else {
            let b = this.tryValue(nums, goal, i+1, totalB, usedNumsB);
            let a = this.tryValue(nums, goal, i+1, totalA, usedNumsA);

            if (a != []) {
                return a;
            } else if (b != []) {
                return b;
            } else {
                console.log("Something Unexpected");
            }
        }
    }

    render() {

        let negNums = this.renderNumbers(this.state.negNums, 'positive');
        let posNums = this.renderNumbers(this.state.posNums, 'negative');
        let goalNums = this.renderNumbers(this.state.goals, 'goal');

        return(
            <div id="input-handler-root">
                <InputView
                    negNums={negNums}
                    posNums={posNums}
                    goalNums={goalNums}
                    calcLists={this.state.calcLists}
                    addPosNum={() => this.addPosNum()}
                    addNegNum={() => this.addNegNum()}
                    addGoalNum={() => this.addGoalNum()}
                    calcNums={() => this.calcNums()}
                    vs={this.state.vs}
                >
                </InputView>
            </div>
        )
    }

}

export default InputHandler;