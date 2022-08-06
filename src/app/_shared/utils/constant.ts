// 1. define value attendance
export const ATTENDANCE_STATUS_NOT_YET = 0; // Chưa thiết lập
export const ATTENDANCE_STATUS_ON_TIME = 1; // Đúng giờ
export const ATTENDANCE_STATUS_LATE = 2; // Đi muộn
export const ATTENDANCE_STATUS_EXCUSED_ABSENT = 3; // Vắng có phép
export const ATTENDANCE_STATUS_UNEXCUSED_ABSENT = 4; //Vắng không phép
export const ATTENDANCE_STATUS_EXCUSED_ABSENT_SCHEDULED = 5; // Vắng có phép (có kế hoạch)
export const ATTENDANCE_STATUS_EXCUSED_ABSENT_UNSCHEDULED = 6; // Vắng có phép (đột xuất)
export const ATTENDANCE_STATUS_NOT_SCHOOL_YET = 7; //Chưa đến trường



// 2. TIME_OUT_LISTEN_FIREBASE
export const TIME_OUT_LISTEN_FIREBASE = 10000;

// 3. regex
export const REGEX_PHONE = /^(((0|0084|\+84)(3[2|3|4|5|6|7|8|9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|7|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})|((1900|1800)([0-9]{4}))|((1900|1800)([0-9]{6}))|((02)([0-9]{9}))))$/;
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_CODE = /^([0-9]*)([a-zA-Z\s\w|\_|\-]*).{6,20}$/;
export const REGEX_FULL_NAME = /^([0-9]*)([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s\w|\_|\-|\[|\]|\(|\)]{6,250})$/;
export const REGEX_PASSWORD = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
export const REGEX_USER_NAME = /^[a-zA-Z0-9\\_]+$/;
export const REGEX_LINK = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

// 4. google captcha
export const GOOGLE_CAPTCHA_SITE_KEY = "6LdNXPsgAAAAANnEao1wbHB0LNLz8vD-CSsdTL4j";// site key gg captcha

// 5. layout
export const LAYOUTS = [
  { code: 'staff', name: 'Layout của cán bộ nhân viên của tenant' },
  { code: 'teacher', name: 'Layout của giáo viên' },
  { code: 'parent', name: 'Layout của phụ huynh' },
  { code: 'student', name: 'Layout của học sinh' },
  { code: 'omt', name: 'Layout cán bộ nhân viên OMT' },
  { code: 'department', name: 'Layout sở' },
  { code: 'division', name: 'Layout phòng' },
  { code: 'school', name: 'Layout trường không sử dụng SO' },
  { code: 'tenant', name: 'Layout quản trị Tenant' },
  { code: 'campus', name: 'Layout quản lý Campus' },
]

// 6. default page size
export const PAGE_SIZE_DEFAULT = 20;
export const PAGE_INDEX_DEFAULT = 1;
export const PAGE_SIZE_OPTIONS_DEFAULT = [5, 10, 20, 50];

// 7. message when call api error
export const MESSAGE_ERROR_CALL_API = "Có lỗi xảy ra trong quá trình xử lý";

// 8. khu vực
export const LOCATION = [
  { code: 'vi' },
  { code: 'en' },
  { code: 'jp' },
]

// 9. mũi giờ
export const TIMEZONE = [
  { code: 'UTC +07:00' },
]

// 10. ngôn ngữ
export const LANGUAGE = [
  { code: 'vi' },
  { code: 'en' },
  { code: 'jp' },
]

// 11. đơn vị tiền tệ
export const CURRENCY_UNIT = [
  { code: 'VND' },
  { code: 'DOLLAR' },
]

// 12. tất cả gói menu
export const USE_MENU_ALL = 1;

// 13. status user
export const STATUS_USERS = [
  { value: 0, label: 'Bị khóa' },
  { value: 1, label: 'Kích hoạt' }
]

// 14. Avatar default
export const AVATAR_DEFAULT = "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png";

// 15. Training level
export const TRAINING_LEVEL = [
  { code: 1, label: 'EDUCATIONAL_STAGES_PRESCHOOL', name: 'Trường mầm non' },
  { code: 2, label: 'EDUCATIONAL_STAGES_PRIMARY_SCHOOL', name: 'Trường tiểu học' },
  { code: 3, label: 'EDUCATIONAL_STAGES_SECONDARY_SCHOOL', name: 'Trường THCS' },
  { code: 4, label: 'EDUCATIONAL_STAGES_HIGH_SCHOOL', name: 'Trường THPT' },
  { code: 5, label: 'EDUCATIONAL_STAGES_SECONDARY_HIGH_SCHOOL', name: 'Trường THCS + THPT' },
  { code: 99, label: 'EDUCATIONAL_STAGES_HIGH_SCHOOL', name: 'Khác' },
]

// 16. Permission
export const DATA_PERMISSION = {
  // role
  role_view: 'role_view',
  role_modify: 'role_modify',

  // Người dùng
  user_modify: 'user_modify', // minhnc
  user_view: 'user_view', //minhnc

  omt_access: 'omt_access', //duynq
  omt_manager: 'omt_manager', //duynq

  // Thông tư
  circulars_access:'circulars_access', // minhnc
  circulars_manager:'circulars_manager', // minhnc

  // Năm học
  school_year_access:'school_year_access', // minhnc
  school_year_manager:'school_year_manager', // minhnc

  moet_access: 'moet_access', //duynq
  moet_manager: 'moet_manager', //duynq
  tenant_manager: 'tenant_manager', //duynq
  tenant_access: 'tenant_access', //duynq

  student_view: 'student_view', //duynq
  student_modify: 'student_modify', //duynq
}


// 17. Trạng thái học sinh
export const STUDENT_STATUS = {
  '01': 'Đang học' , // đang học
  '02': 'Chuyển đến kỳ 1', // Chuyển đến kỳ 1
  '03': 'Nghỉ học xin học lại kỳ 1' , // Nghỉ học xin học lại kỳ 1
  '04': 'Chuyển đi kỳ 1' , // Chuyển đi kỳ 1
  '05': 'Thôi học kỳ 1' , // Thôi học kỳ 1
  '06': 'Chuyển đến kỳ 2' , // Chuyển đến kỳ 2
  '07': 'Nghỉ học xin học lại kỳ 2' , // Nghỉ học xin học lại kỳ 2
  '08': 'Chuyển đi kỳ 2' , // Chuyển đi kỳ 2
  '09': 'Thôi học kỳ 209' , // Thôi học kỳ 2
  '10': 'Chuyển đến trong hè' , // Chuyển đến trong hè
  '11': 'Chuyển đi trong hè' , // Chuyển đi trong hè
  '12': 'Thôi học trong hè'  // Thôi học trong hè
}
