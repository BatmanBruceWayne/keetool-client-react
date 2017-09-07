import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Avatar from "../../../components/common/Avatar";
import ProjectMemberPopover from "./ProjectMemberPopover";
import {showWarningNotification} from "../../../helpers/helper";

class ProjectMemberDetailOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.assignMember = this.assignMember.bind(this);
        this.state = {
            show: false
        };
        this.setAdmin = this.setAdmin.bind(this);
    }

    assignMember() {
        this.props.taskActions.assignProjectMember(this.props.project, this.props.member);
    }

    toggle(event) {
        event.stopPropagation();
        this.setState({show: !this.state.show});
    }

    setAdmin() {
        const admins = this.props.project.members.filter(member => member.is_admin);
        const numAdmins = admins.length;

        if (numAdmins === 1 && admins[0].id === this.props.member.id) {
            showWarningNotification("Dự án phải có ít nhất 1 quản trị viên");
        } else {
            this.props.taskActions.changeProjectMemberRole(this.props.project, this.props.member);
        }

    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <a ref="target" onClick={this.toggle}>
                    <Avatar key={this.props.member.id} url={this.props.member.avatar_url} size={30}/>
                </a>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <ProjectMemberPopover
                        setAdmin={this.setAdmin}
                        assignProjectMember={this.assignMember}
                        member={this.props.member}
                        toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}

ProjectMemberDetailOverlayContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        project: state.task.projectDetail.project
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemberDetailOverlayContainer);