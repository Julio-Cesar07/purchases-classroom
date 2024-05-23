type ErrorGlobalHttpProps = {
  message: string;
  statusCode: number;
};

export class ErrorGlobalHttp extends Error {
  private props: ErrorGlobalHttpProps;
  constructor(props: ErrorGlobalHttpProps) {
    super(props.message);
    this.props = props;
  }

  get statusCode() {
    return this.props.statusCode;
  }

  get message() {
    return this.props.message;
  }
}
