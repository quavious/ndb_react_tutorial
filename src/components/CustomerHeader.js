import React, {Component} from "react";
import {TableHead, TableCell} from "@material-ui/core";

export default class CustomerHeader extends Component {
    render() {
        return (
            <TableHead>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
            </TableHead>
        )
    }
}