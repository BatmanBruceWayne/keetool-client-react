import * as types from '../../constants/actionTypes';
import * as historyCallsApi from './historyCallsApi';

/*eslint no-console: 0 */

export function historyCalls(page, salerId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_CALLS
        });
        historyCallsApi.historyCalls(page, salerId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_HISTORY_CALLS_SUCCESS,
                    teleCalls: res.data.tele_calls,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_HISTORY_CALLS_ERROR
            });
        });
    };
}






