import React, { Component } from "react";
import {  Button,  Label, Col,Row ,Modal,ModalHeader,ModalBody} from 'reactstrap';
import {Control ,LocalForm,Errors} from 'react-redux-form';
const maxLength=(len)=>(val)=> !(val) || (val.length<=len);
const minLength=(len)=>(val)=> (val) && (val.length>=len);
class Comment extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
        this.Open=this.Open.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    Open(){
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    handleSubmit(values){
        this.Open();
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
    }
    render(){
        return(
            <React.Fragment>
                <Button onClick={this.Open}>Submit Comment</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.Open}>
                    <ModalHeader toggle={this.Open}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={10}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength:minLength(3),maxLength:maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength:'Must be greater than 2 Characters',
                                            maxLength:'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={10}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
export default Comment;