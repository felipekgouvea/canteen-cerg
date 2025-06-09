interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="text-sm text-destructive-foreground bg-destructive/10 p-2 rounded-md">
      {message}
    </p>
  );
};

export default ErrorMessage;

