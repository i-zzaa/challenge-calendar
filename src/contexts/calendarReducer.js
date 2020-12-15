const calendarReducer = (state, action) => {
  switch (action.type) {
    case 'TYPE_PREVIEW':
      return {
        ...state,
        type_preview: action.data,
      };
    case 'CURRENT_DATE':
      return {
        ...state,
        current_date: action.data,
      };
  }
};

export default calendarReducer;
