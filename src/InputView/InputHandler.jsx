import React, { Component } from 'react';
import InputView from './InputView';


let copyArray = (arr1) => {
    let arr2 = [];
    for (let i = 0; i < arr1.length; i ++) {
        arr2.push(arr1[i]);
    }
    return arr2;
}

class InputHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            negNums: [],
            posNums: [],
            goalNums: [],
            calcLists: [],
            nums: [],
            goals: [],
            vs: []
        }
    }

    addNegNum() {
        let nums = this.state.negNums;
        let n = this.state.nums;
        let size = nums.length + 1;
        let t = document.getElementById("neg-nums").value;
        let ns = t.split(' ');
        for (let i = 0; i < ns.length; i ++) {
            nums.push(<li key={size}>{ns[i]}</li>);
            n.push(parseFloat(ns[i]));
        }
        this.setState({
            negNums: nums,
            nums: n
        });
    }

    addPosNum() {
        let nums = this.state.posNums;
        let n = this.state.nums;
        let size = nums.length + 1;
        let t = document.getElementById("pos-nums").value;
        let ns = t.split(' ');
        for (let i = 0; i < ns.length; i ++) {
            nums.push(<li key={size}>{ns[i]}</li>);
            n.push(parseFloat(ns[i]));
        }
        this.setState({
            posNums: nums,
            nums: n
        });
    }

    addGoalNum() {
        let nums = this.state.goalNums;
        let goals = this.state.goals;
        let size = nums.length + 1;
        let t = document.getElementById("goal-nums").value;
        let ns = t.split(' ');
        for (let i = 0; i < ns.length; i ++) {
            nums.push(<li key={size}>{ns[i]}</li>);
            goals.push(parseFloat(ns[i]));
        }
        this.setState({
            goalNums: nums,
            goals: goals
        });
    }

    calcNums() {

        let x = this.state.nums;
        for (let i = 0; i < this.state.goals.length; i ++) {
            console.log(`Find values for : ${this.state.goals[i]}`);
            console.log(`Out of ${x}`);
            console.log(this.findValue(x, this.state.goals[i]));
        }

    }  

    findValue(nums, goal) {
        let checked = false;
        let i = 0;

        let res = this.tryValue(nums, goal, 0, parseFloat('0.00'), [])
    
        console.log(res);

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
        return(
            <div id="input-handler-root">
                <InputView
                    negNums={this.state.negNums}
                    posNums={this.state.posNums}
                    goalNums={this.state.goalNums}
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