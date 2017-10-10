import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from "react-bootstrap";
import Avatar from "../../components/common/Avatar";
import {confirm} from "../../helpers/helper";

class TaskTemplateItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddMemberToTaskModal = this.openAddMemberToTaskModal.bind(this);
        this.openTaskSpanModal = this.openTaskSpanModal.bind(this);
        this.openAddPropertyItemToTaskModal = this.openAddPropertyItemToTaskModal.bind(this);

    }

    openAddMemberToTaskModal() {
        this.props.openAddMemberToTaskModal(this.props.task);
    }

    openTaskSpanModal() {
        this.props.openTaskSpanModal(this.props.task);
    }

    openAddPropertyItemToTaskModal() {
        this.props.openAddPropertyItemToTaskModal(this.props.task);
    }

    render() {
        const {task} = this.props;
        return (
            <ListGroupItem
                key={task.id}
                style={{display: "flex", justifyContent: "space-between", position: "relative"}}>
                <div className="checkbox" id={"task" + task.id}>
                    <label style={{fontWeight: 700, color: "#858585"}}>
                        <div style={{display: "inline-block", position: "relative", top: 4}}>
                            {
                                task.member && (
                                    <Avatar url={task.member.avatar_url} size={20}/>
                                )
                            }
                        </div>
                        {task.title}
                        {
                            !!task.span && (
                                <small className="keetool-card"
                                       style={{fontWeight: 400}}> - trong {task.span} giờ</small>
                            )
                        }
                    </label>
                </div>
                <div className="dropdown" style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px"
                }}>
                    <a className="dropdown-toggle btn-more-dropdown" type="button"
                       data-toggle="dropdown">
                        <i className="material-icons">more_horiz</i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li className="more-dropdown-item">
                            <a onClick={this.openAddMemberToTaskModal}>
                                <i className="material-icons">person</i>
                                Phân thành viên
                            </a>
                        </li>
                        <li className="more-dropdown-item">
                            <a onClick={this.openTaskSpanModal}>
                                <i className="material-icons">timer</i>
                                Thời gian thực hiện
                            </a>
                        </li>
                        {
                            this.props.type && (
                                <li className="more-dropdown-item">
                                    <a onClick={this.openAddPropertyItemToTaskModal}>
                                        <i className="material-icons">build</i>
                                        Thuộc tính cần nhập khi hoàn thành
                                    </a>
                                </li>
                            )
                        }

                        <li className="more-dropdown-item">
                            <a onClick={() => {
                                confirm("warning", "Xoá", "Bạn có chắc chắn muốn xoá công việc này", () => {
                                    this.props.deleteTaskTemplate(task);
                                });
                            }}>
                                <i className="material-icons">delete</i>
                                Xoá công việc
                            </a>
                        </li>
                    </ul>
                </div>
            </ListGroupItem>
        );

    }

}

TaskTemplateItem.propTypes = {
    type: PropTypes.string,
    deleteTaskTemplate: PropTypes.func.isRequired,
    openAddPropertyItemToTaskModal: PropTypes.func.isRequired,
    openAddMemberToTaskModal: PropTypes.func.isRequired,
    openTaskSpanModal: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

TaskTemplateItem.defaultProps = {};

export default TaskTemplateItem;