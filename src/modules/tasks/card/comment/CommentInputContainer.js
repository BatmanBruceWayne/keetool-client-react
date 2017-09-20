import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../../taskActions';
import {commentCard} from '../../taskApi';
import './comment.css';
import Loading from "../../../../components/common/Loading";
import UploadAttachmentOverlayContainer from "../attachment/UploadAttachmentOverlayContainer";

class CommentInputContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
        this.state = {
            isCommenting: false,
            value: ""
        };
        this.textAreaChange = this.textAreaChange.bind(this);
        this.textAreaAdjust = this.textAreaAdjust.bind(this);
    }

    textAreaAdjust(event) {
        const o = event.target;
        o.style.height = "1px";
        o.style.height = (10 + o.scrollHeight) + "px";
    }

    textAreaChange(event) {
        this.props.taskActions.updateCommentInputValue(event.target.value);
    }

    onEnterKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            const value = e.target.value;
            this.setState({
                isCommenting: true
            });
            commentCard(value, this.props.card.id)
                .then((res) => {
                    this.setState({
                        isCommenting: false
                    });
                    this.props.taskActions.saveCardCommentSuccess(res.data.data.comment);
                });
        }
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                {
                    this.state.isCommenting ? <Loading/> : (
                        <div className="comment-input-wrapper">
                            <textarea
                                onChange={this.textAreaChange}
                                value={this.props.value}
                                onKeyUp={this.textAreaAdjust}
                                placeholder="Viết bình luận của bạn..."
                                onKeyPress={this.onEnterKeyPress}
                                className="comment-input"/>
                            <div className="btn-upload-file-comment">
                                <UploadAttachmentOverlayContainer card={this.props.card}>
                                    <i style={{fontSize: "16px"}} className="material-icons">attachment</i>
                                </UploadAttachmentOverlayContainer>
                            </div>
                        </div>
                    )
                }

            </div>
        );
    }
}

CommentInputContainer.propTypes = {
    card: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card,
        comment: state.task.comment.comment,
        value: state.task.commentCard.value
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);