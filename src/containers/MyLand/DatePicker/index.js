import React from 'react';
import './style.js'
import { Container, Sd, Open, Button, InputWapper } from './style.js';

import calendar from "./calendar.png";

const DatePicker = () => {
    return (
        <Container>
            <Sd type="date" name="selected_date" />
            <Open>
                <img style={{cursor: 'pointer'}} src={calendar} alt=""/>
            </Open>
        </Container>
    );
}

export default DatePicker;
