import React from "react";
import './tables.css';
import members from "./member.json"
import "./tables.css"
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const tabletitle = ["d", "e", "f", "a"]

export function Table2() {
    console.log("table2")
    const getSex = (sex) => {
        switch (sex) {
            case 0:
                return "男"
                break;
            case 1:
                return "女"
                break;
        }
    }
    const getAge = (age) => {
        if (age <= 18) {
            return "年輕" + age;

        } else {
            return "老" + age;
        }
    }
    return (
        <form>
            <table>
                <thead>
                    <tr>
                        {
                            tabletitle.map((prop) => { return (<th>{prop}</th>) })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        members.map((member) => { return (<tr><td>{member.name}</td><td>{member.dollar}</td><td>{getAge(member.age)}</td><td>{getSex(member.sex)}</td></tr>) })
                    }
                </tbody>
            </table>
        </form>
    );
}