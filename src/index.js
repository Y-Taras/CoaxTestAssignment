import React from 'react';
import { render } from 'react-dom';
import { Form, FormGroup, Input, Container, Label, Row, Col } from 'reactstrap';
import Table from './Table';
import 'bootstrap/dist/css/bootstrap.css';
import mock_data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: { laptop: false, tablet: false, mobile_phone: false }
    };
    this.getCheckedValues = this.getCheckedValues.bind(this)
  }
  handleInput(propertyName, evt) {
      const checked = this.state.checked;
      checked[propertyName] = evt.target.checked;
      this.setState({ checked: checked });
  }
  getCheckedValues(){
    let array = [];
    const obj = this.state.checked
    for (const key in obj) {
      if (obj[key]) {
        array.push(key)
      }
    }
    console.log(array);
    return array;
  }
  render() {
    return (
      <Container>
        <Row>
          <Col sm="3" className="mt-5">
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={this.handleInput.bind(this, 'laptop')}
                    type="checkbox"
                    aria-label="Checkbox for notebooks"
                  />{' '}
                  Notebooks
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={this.handleInput.bind(this, 'tablet')}
                    type="checkbox"
                    aria-label="Checkbox for tablets"
                  />{' '}
                  Tablets
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={this.handleInput.bind(this, 'mobile_phone')}
                    type="checkbox"
                    aria-label="Checkbox for mobile phones"
                  />{' '}
                  Mobile phones
                </Label>
              </FormGroup>
            </Form>
          </Col>
          <Col sm="9">
            <Table price_list={mock_data} checked={this.getCheckedValues()} />
          </Col>
        </Row>
      </Container>
    );
  }
}

render(<App />, document.getElementById('root'));
