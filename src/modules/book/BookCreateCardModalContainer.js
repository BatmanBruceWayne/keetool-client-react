import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as taskActions from '../tasks/taskActions';
import FormInputText from "../../components/common/FormInputText";
import {isEmptyInput} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Select from 'react-select';
import GoodPropertyItem from "../good/GoodPropertyItem";
import InputGoodProperties from "../good/InputGoodProperties";

class BookCreateCardModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateGoodPropertiesOutput = this.updateGoodPropertiesOutput.bind(this);
        this.state = {
            taskListTemplate: {},
            goodPropertiesOutput: {}
        };

    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal) {
            this.props.taskActions.loadTaskListTemplates(nextProps.projectId);
        }
    }

    close() {
        this.props.taskActions.changeStatusCreateCardModal(false);
    }

    submit() {
        this.props.taskActions.createCard({...this.props.card, board_id: this.props.board.id});
    }

    updateGoodPropertiesOutput(goodPropertiesOutput) {
        this.setState(goodPropertiesOutput);
    }

    updateFormData(event) {
        const value = event.target.value;
        let card = {...this.props.card};
        const field = event.target.name;
        card[field] = value;
        this.props.taskActions.updateCreateCardFormData(card);
    }

    handleChange(val) {
        this.setState({
            taskListTemplate: val
        });
        this.props.taskActions.loadGoodPropertyItems(val.id);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Đề cử</Modal.Title>
                    <div className="modal-small-text">Bảng {this.props.board.title}</div>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoadingTaskListTemplate ? <Loading/> : (
                            <div>
                                <Select
                                    defaultMessage="Chọn quy trình"
                                    options={this.props.taskListTemplates}
                                    disableRound
                                    value={this.state.taskListTemplate}
                                    onChange={this.handleChange}/>
                                {
                                    this.state.taskListTemplate.id && (
                                        <div>
                                            {
                                                this.props.isLoading ? <Loading/> : (
                                                    <div>
                                                        <FormInputText
                                                            placeholder="Nhập tên sản phẩm"
                                                            label="Tên sản phẩm"
                                                            name="title"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.card.title}/>

                                                        <InputGoodProperties
                                                            goodPropertiesOutput={this.state.goodPropertiesOutput}
                                                            goodProperties={this.props.goodPropertyItems}
                                                            updateGoodPropertiesOutput={this.updateGoodPropertiesOutput}/>

                                                        <div>
                                                            {this.props.isSaving ?
                                                                (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-rose disabled">
                                                                        <i className="fa fa-spinner fa-spin"/> Đang xử
                                                                        lý...
                                                                    </button>
                                                                ) :
                                                                (
                                                                    <button
                                                                        disabled={isEmptyInput(this.props.card.title)}
                                                                        type="button"
                                                                        className="btn btn-rose"
                                                                        onClick={this.submit}>
                                                                        Đề cử
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }

                            </div>
                        )
                    }


                </Modal.Body>
            </Modal>
        );
    }
}

BookCreateCardModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectId: PropTypes.number,
    card: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    taskListTemplates: PropTypes.array.isRequired,
    goodPropertyItems: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.createCard.showModal,
        isSaving: state.task.createCard.isSaving,
        isLoadingTaskListTemplate: state.task.createCard.isLoadingTaskListTemplate,
        card: state.task.createCard.card,
        board: state.task.createCard.board,
        isLoading: state.task.createCard.isLoading,
        taskListTemplates: state.task.createCard.taskListTemplates,
        goodPropertyItems: state.task.createCard.goodPropertyItems
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCreateCardModalContainer);