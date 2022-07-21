import React from 'react';
import InputColor from 'react-input-color';
import { Col, Row, FormGroup, Label } from "reactstrap";

const ColorSelect = ({ setValue, defaultValue }) => {
    const [colors, setColors] = React.useState([]);

    return (
        <Row>
            <Col md={6}>
                <FormGroup>
                    <Label for="iconLeft" >Minimum</Label>
                    <div className="position-relative ">
                        <InputColor
                            initialValue={defaultValue ?  defaultValue[0] : '#eaeaea'}
                            onChange={({hex}) => {
                                const colorsTmp = colors
                                colorsTmp[0] = hex
                                setColors(colorsTmp)
                                setValue(colorsTmp)
                            }}
                            placement="right"
                            className="form-control"
                        />
                </div>
                </FormGroup>
            </Col>

            <Col md={6}>
                <FormGroup>
                    <Label for="iconLeft" >Maximum</Label>
                    <div className="position-relative ">
                        <InputColor
                            initialValue={defaultValue ?  defaultValue[1] : '#eaeaea'}
                            onChange={({hex}) => {
                                const colorsTmp = colors
                                colorsTmp[1] = hex
                                setColors(colorsTmp)
                                setValue(colorsTmp)
                            }}
                            placement="right"
                            className="form-control"
                        />
                    </div>
                </FormGroup>
            </Col>
        </Row>
    );
}

export default ColorSelect;
