import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as taskActions from '../../taskActions';
import MemberReactSelectValue from "../../board/filter/MemberReactSelectValue";
import MemberReactSelectOption from "../../board/filter/MemberReactSelectOption";
import Select from "react-select";
import Loading from "../../../../components/common/Loading";

class AddMemberToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.userSelectChange = this.userSelectChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal && nextProps.task.id)
            this.props.taskActions.loadAvailableMembers(nextProps.task);
    }

    close() {
        this.props.taskActions.closeAddMemberToTaskModal();
    }

    userSelectChange(val) {
        this.props.taskActions.updateAssignMemberToTaskForm(val);
    }


    render() {
        return (
            <Modal bsSize="small" show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Phân công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <Select
                                placeholder="Nhập tên"
                                style={{width: "100%"}}
                                value={this.props.selectedMember}
                                name="members"
                                valueComponent={MemberReactSelectValue}
                                optionComponent={MemberReactSelectOption}
                                options={this.props.members}
                                onChange={this.userSelectChange}
                            />
                        )
                    }


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddMemberToTaskModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    selectedMember: PropTypes.object,
    members: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.task.addMemberToTask.isLoading,
        showModal: state.task.addMemberToTask.showModal,
        task: state.task.addMemberToTask.task,
        members: state.task.addMemberToTask.members.map((member) => {
            return {
                ...member,
                value: member.id,
                label: member.name
            };
        }),
        selectedMember: state.task.addMemberToTask.selectedMember
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberToTaskModalContainer);