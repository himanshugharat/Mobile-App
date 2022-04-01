import {
  ADD_TASK,
  GET_ALL_TASK,
  UPDATE_TASK,
  ADD_LOCAL_DATA,
  REMOVE_LOCAL_DATA,
  GET_LOCAL_DATA,
  ATTENDENCE_DATA,
  BUTTON_STEPPER,
  UPDATE_TIME,
  UPDATE_PLACE,
  UPDATE_ACTION,
  ADD_TASK_ACTION,
} from './taskType';

const initialState = {
  task: [
    {
      'Account Status': 'data',
      Address: 'C/46 102 Yogi Nagar Borivali west ',
      'Amount Collected': '6497',
      'Amount due': '-565',
      'Any New Requirement': 'No',
      CAN: '12374115',
      ChildDC: 'STB Issue',
      ChildDc: '02-08-2021 14:19:37',
      'Contact Details': '9321028200',
      'Customer Category': 'Commercial',
      'Customer Stage': '2',
      'Date of Visit': '02-08-2021 14:19:37',
      'Due date': '29-07-2021',
      'LDR 12M Amount': '3932.4',
      'LDR 3M Amount': '1044',
      'LDR 6M Amount': '1983.6',
      'Last mode of Recharge': 'Online',
      'Last recharge amount': '978',
      'Last recharge date': '30-06-2021',
      'Minutes of Meeting': '',
      'Monthly Rental:': '348',
      Name: 'GAJJAR ',
      'New Mobile Number': '6649979',
      'Online Recharge Process Explained': 'No',
      'Parent CAN': '12374115',
      'Person Met': 'Idkh',
      'Product Name': 'preDP Foundation + Marathi Super (NS) with VAS',
      'Purpose of Visit': 'Retention',
      'Reason of DC': 'Technical Issue',
      Requirement: '',
      'STB number': '010512182272537514',
      Subcriptions: '',
      assigned_to: 'Shreemant Shekhar',
      endLat: 18.8772938,
      enddate: 2,
      endlong: 72.9307513,
      endtime: 1627894205786,
      id: '12374115',
      locationDataLat: 'Kegaon Rd',
      locationDataLong: 'Kegaon Road',
      startLat: 18.8772938,
      startLong: 72.9307513,
      startTime: 1627894175453,
      'task status': 'done',
    },
    {
      'Account Status': 'data',
      Address: 'H-WING 201SHEETAL ASHISH MIRA ROAD EAST ',
      'Amount Collected': '934',
      'Amount due': '151',
      'Any New Requirement': 'No',
      CAN: '12696854',
      ChildDC: '5464',
      ChildDc: '01-08-2021 15:24:31',
      'Contact Details': '9870192458',
      'Customer Category': 'Non-Commercial',
      'Customer Stage': '2',
      'Date of Visit': '01-08-2021 15:24:31',
      'Due date': '29-07-2021',
      'LDR 12M Amount': '1728.9',
      'LDR 3M Amount': '459',
      'LDR 6M Amount': '872.1',
      'Last mode of Recharge': 'Online',
      'Last recharge amount': '8',
      'Last recharge date': '30-06-2021',
      'Minutes of Meeting': '',
      'Monthly Rental:': '153',
      Name: 'H PUTRAN',
      'New Mobile Number': '66464',
      'Online Recharge Process Explained': 'No',
      'Parent CAN': '12696854',
      'Person Met': 'Idk',
      'Product Name': 'preDP Foundation Pack MH',
      'Purpose of Visit': 'Retention',
      'Reason of DC': 'Rotational Churn',
      Requirement: '',
      'STB number': '436151836024450',
      Subcriptions: '',
      assigned_to: 'Shreemant Shekhar',
      endLat: 18.877291,
      enddate: 1,
      endlong: 72.9307518,
      endtime: 1627811695975,
      id: '12696854',
      locationDataLat: 'Kegaon Rd',
      locationDataLong: 'Kegaon Road',
      startLat: 18.877291,
      startLong: 72.9307518,
      startTime: 1627810649351,
      'task status': 'done',
    },
  ],
  localData: {},
  updateLocal: 1,
  updateAttendence: 'checkIn',
  updateButton: false,
  actionList: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case ADD_TASK_ACTION:
      return {
        ...state,
        actionList: action.payload,
      };

    case ADD_TASK:
      return {...state};
    case UPDATE_TASK:
      return {...state};
    case ADD_LOCAL_DATA:
      return {
        ...state,
        localData: action.payload,
      };
    case REMOVE_LOCAL_DATA:
      return {
        ...state,
        localData: {},
      };

    case GET_LOCAL_DATA:
      return {
        ...state,
        updateLocal: action.payload,
      };
    case ATTENDENCE_DATA:
      return {
        ...state,
        updateAttendence: action.payload,
      };
    case BUTTON_STEPPER:
      return {
        ...state,
        updateButton: action.payload,
      };
    case UPDATE_TIME:
      let counter;
      // const place = state.task.findIndex(todo => {
      //   console.log(todo.id === action.payload);
      //   todo.id === action.payload;
      // });
      for (let i = 0; i < state.task.length; i++) {
        if (state.task[i].id === action.payload) {
          counter = i;
        }
      }

      const newArray = [...state.task];
      // console.log(newArray);
      console.log(counter);
      newArray[counter]['task status'] = 'done';
      return {
        ...state,
        task: newArray,
      };
    case UPDATE_PLACE:
      let counter1;
      // const place = state.task.findIndex(todo => {
      //   console.log(todo.id === action.payload);
      //   todo.id === action.payload;
      // });
      for (let i = 0; i < state.task.length; i++) {
        if (state.task[i].id === action.payload) {
          counter1 = i;
        }
      }

      const newArray1 = [...state.task];
      // console.log(newArray);
      console.log(counter1);
      newArray1[counter1]['task status'] = 'incomplete';
      return {
        ...state,
        task: newArray1,
      };
    case UPDATE_ACTION:
      let counter3;
      // const place = state.task.findIndex(todo => {
      //   console.log(todo.id === action.payload);
      //   todo.id === action.payload;
      // });
      for (let i = 0; i < state.task.length; i++) {
        if (state.actionList[i].id === action.payload) {
          counter3 = i;
        }
      }

      const newArray11 = [...state.task];
      // console.log(newArray);
      console.log(counter3);
      newArray11[counter3]['taskstatus'] = 'done';
      return {
        ...state,
        actionList: newArray11,
      };
    default:
      return state;
  }
};
export default taskReducer;
