import Vue from "vue";
import Cookies from "js-cookie";

import {
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  Option,
  Button,
  Radio,
  RadioGroup,
  DatePicker,
  Row,
  Col,
  Dialog,
  Menu,
  Tree,
  Submenu,
  MenuItem,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  ColorPicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Table,
  TableColumn,
  Pagination,
  Popover,
  Tag,
  Upload,
  Timeline,
  TimelineItem,
  Card,
  Progress,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem,
  Loading,
  MessageBox,
  Message,
  Notification
} from "element-ui";

const Elements = [
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  Option,
  Button,
  Radio,
  RadioGroup,
  DatePicker,
  Row,
  Col,
  Dialog,
  Menu,
  Tree,
  Submenu,
  MenuItem,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  ColorPicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Table,
  TableColumn,
  Pagination,
  Popover,
  Tag,
  Upload,
  Timeline,
  TimelineItem,
  Card,
  Progress,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem
];

// 设置elementUI默认大小
Vue.prototype.$ELEMENT = { size: Cookies.get("size") || "mini" };

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Elements.forEach(item => {
  Vue.component(item.name, item);
});
