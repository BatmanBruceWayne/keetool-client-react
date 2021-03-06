/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import * as classActions from './classActions';
import ListClass from './ListClass';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import AddClassContainer from './AddClassContainer';
import Select from './SelectGen';

class ClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModalClass: false,
            classSelected: {},
            editClass: false,
            gens: [],
            selectGenId: '',
            openLoadingModal: false,
        };
        this.search = {
            teacherId: ''
        };
        this.timeOut = null;
        this.loadClasses = this.loadClasses.bind(this);
        this.classesSearchChange = this.classesSearchChange.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.duplicateClass = this.duplicateClass.bind(this);
        this.changeClassStatus = this.changeClassStatus.bind(this);
        this.closeModalClass = this.closeModalClass.bind(this);
        this.openModalClass = this.openModalClass.bind(this);
        this.changeGens = this.changeGens.bind(this);
        this.beginExportExcel = this.beginExportExcel.bind(this);
    }

    componentWillMount() {
        if (this.props.params.teacherId) {
            this.search.teacherId = this.props.params.teacherId;
        }
        this.props.classActions.loadGensData(()=>{return this.props.classActions.loadClasses('', 1, this.search.teacherId, this.state.selectGenId);});
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingGens && nextProps.isLoadingGens !== this.props.isLoadingGens)
        {
            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            this.setState({
                gens: [...gens],
                selectGenId: 11,
            });
        }
        /*if (!nextProps.isLoadingExcel && this.props.isLoadingExcel)
        {
          let data = nextProps.excel.map((obj)=>{
              let res = {
                  'Tên lớp': obj.name,
                  'Giảng viên': obj.teacher ? obj.teacher.name : "",
                  'Trợ giảng': obj.teaching_assistant ? obj.teaching_assistant.name : ""
              };
              return res;
          });
          if(data.length == 0){ helper.showErrorNotification("Khóa hiện tại chưa có dữ liệu")}
          else {
              let wb = helper.newWorkBook();
              helper.appendJsonToWorkBook(data, wb, 'Danh sách lớp');
              helper.saveWorkBookToExcel(wb, 'Danh sách lớp');
          }
          this.setState({openLoadingModal: false});
        }*/
        if (nextProps.params.teacherId !== this.props.params.teacherId) {
            this.search.teacherId = nextProps.params.teacherId;
            this.setState({
                query: ''
            });
            this.loadClasses(1, '');
        }
    }

    classesSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.loadClasses(1, value);
        }.bind(this), 500);
    }

    loadClasses(page = 1, query = '') {
        this.setState({page});
        this.props.classActions.loadClasses(query, page, this.search.teacherId, this.state.selectGenId);
    }

    deleteClass(classData) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa lớp " + classData.name + " không?", () => {
            this.props.classActions.deleteClass(classData.id);
        });

    }

    duplicateClass(classData) {
        this.props.classActions.duplicateClass(classData.id);
    }

    changeClassStatus(classData) {
        this.props.classActions.changeClassStatus(classData.id);
    }

    closeModalClass() {
        this.setState({showModalClass: false});
    }

    openModalClass(classData = {}, editClass = false) {
        if (editClass) {
            classData = {
                id: classData.id,
                name: classData.name,
                description: classData.description,
                target: classData.target,
                regis_target: classData.regis_target,
                study_time: classData.study_time,
                gen_id: classData.gen ? classData.gen.id : '',
                course_id: classData.course ? classData.course.id : '',
                teacher_assis_id: classData.teacher_assistant ? classData.teacher_assistant.id : '',
                teacher_id: classData.teacher ? classData.teacher.id : '',
                schedule_id: classData.schedule_id,
                type: classData.type,
                status: classData.status,
                datestart: classData.datestart_en,
                room_id: classData.room ? classData.room.id : '',
            };
        }
        this.setState({
            showModalClass: true,
            classSelected: classData,
            editClass: editClass
        });
    }


    changeGens(value) {
        this.setState({
            page: 1,
            selectGenId: value
        });
        this.props.classActions.loadClasses(this.state.query, '', this.search.teacherId, value);
    }

    beginExportExcel() {
        /*if(this.state.selectGenId == 11 || this.state.selectGenId == '')
            helper.showErrorNotification('Vui lòng chọn một khóa.');
        else{
            this.setState({openLoadingModal: true});
            this.props.classActions.loadExcelData(this.state.selectGenId);
        }*/
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.openLoadingModal}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách lớp học</h4>
                            {
                                this.props.isCreateClass ?
                                    (
                                        <div>
                                            <div className="row">
                                                {
                                                    (this.state.selectGenId && this.state.selectGenId > 0) &&

                                                    <div className="col-md-12">
                                                        <Select
                                                            options={this.state.gens}
                                                            onChange={this.changeGens}
                                                            value={this.state.selectGenId}
                                                            defaultMessage="Chọn khóa học"
                                                            name="gens"
                                                        />
                                                    </div>

                                                }

                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="col-md-3">
                                                        <button
                                                            type="button"
                                                            className="btn btn-rose"
                                                            onClick={() => {
                                                                this.openModalClass();
                                                            }}
                                                        >
                                                            Thêm lớp
                                                        </button>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <Search
                                                            onChange={this.classesSearchChange}
                                                            value={this.state.query}
                                                            placeholder="Tìm kiếm lớp"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <div className="row">
                                                {
                                                    (this.state.selectGenId && this.state.selectGenId > 0) &&

                                                    <div className="col-md-12">
                                                        <Select
                                                            options={this.state.gens}
                                                            onChange={this.changeGens}
                                                            value={this.state.selectGenId}
                                                            defaultMessage="Chọn khóa học"
                                                            name="gens"
                                                        />
                                                    </div>

                                                }

                                            </div>

                                            <Search
                                                onChange={this.classesSearchChange}
                                                value={this.state.query}
                                                placeholder="Tìm kiếm lớp"
                                            />
                                        </div>
                                    )
                            }


                            {this.props.isLoading || this.props.isLoadingGens ? <Loading/> :
                                <div>
                                    <ListClass
                                        classes={this.props.classes}
                                        deleteClass={this.deleteClass}
                                        duplicateClass={this.duplicateClass}
                                        changeClassStatus={this.changeClassStatus}
                                        openModalClass={this.openModalClass}
                                    />
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadClasses(page, this.state.query)}>
                                                            {page}
                                                        </a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadClasses(page, this.state.query)}>
                                                            {page}
                                                        </a>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModalClass}
                    onHide={this.closeModalClass}
                    bsSize="lg"
                >
                    <Modal.Header closeButton>
                        {this.state.editClass ? "Chỉnh sửa lớp " + this.state.classSelected.name : "Tạo lớp học"}
                    </Modal.Header>
                    <Modal.Body>
                        <AddClassContainer
                            edit={this.state.editClass}
                            classData={this.state.classSelected}
                            closeModal={this.closeModalClass}
                        />
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

ClassesContainer.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    classes: PropTypes.array.isRequired,
    excel: PropTypes.array.isRequired,
    gens: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isCreateClass: PropTypes.bool,
    isLoadingGens: PropTypes.bool,
    isLoadingExcel: PropTypes.bool,
    classActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        currentPage: state.classes.currentPage,
        totalPages: state.classes.totalPages,
        classes: state.classes.classes,
        isLoading: state.classes.isLoading,
        isLoadingExcel: state.classes.isLoadingExcel,
        excel: state.classes.excel,
        isCreateClass: state.classes.isCreateClass,
        gens: state.classes.gens,
        isLoadingGens: state.classes.isLoadingGens,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer);
