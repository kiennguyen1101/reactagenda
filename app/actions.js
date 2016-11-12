//actions
export function openModal(id) {
    return {
        type: "OPEN_MODAL",
        id: id
    };
}

export function closeModal() {
    return {
        type: "CLOSE_MODAL"
    };
}

export function delete_event(id) {
    return {
        type: "DELETE_EVENT",
        id: id 
    }
}

export function edit_event(data) {
    return {
        type: 'EDIT_EVENT',
        data
    }
}

export function next_range() {
    return {
        type: "NEXT_RANGE"
    }
}

export function prev_range() {
    return {
        type: "PREV_RANGE"
    }
}

export function today() {
    return {
        type: "TODAY"
    }
}

export function choose_date(data) {
    return {
        type: "CHOOSE_DATE",
        data
    }
}