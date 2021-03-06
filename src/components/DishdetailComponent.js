import React from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Comment from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={baseUrl +dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else return (
        <div></div>
    );
}
function RenderComments({ comment }) {
    if (comment != null)
        return (
            <div>
                <ul className="list-unstyled" >
                    {comment.map((commented) => {
                        return (
                            <li key={commented.id}>
                                <p>{commented.comment}</p>
                                <p>{commented.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(commented.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
                
            </div>
            
        )
    else return (
        <div></div>
    );
}
const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (
            <div className="container" >
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comment={props.comments}/>
                        <Comment dishId={props.dish.id} postComment={props.postComment}/>
                    </div>
                </div>
            </div>
        );
}

export default DishDetail;