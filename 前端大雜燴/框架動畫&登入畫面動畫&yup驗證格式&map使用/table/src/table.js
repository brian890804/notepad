import React from "react";
import './tables.css';
import members from "./member.json"
import "./tables.css"

const tabletitle = ["a", "b", "c", "d"]
export function Table1() {
    console.log("table1")
    const getSex = (sex) => {
        switch (sex) {
            case 0:
                return "女"
                break;
            case 1:
                return "男"
                break;
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
                        members.map((member) => { return (<tr><td>{member.name}</td><td>{member.dollar}</td><td>{member.age}</td><td>{getSex(member.sex)}</td></tr>) })
                    }

                </tbody>
            </table>
        </form>
    );
}