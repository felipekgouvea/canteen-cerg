interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="rounded-md bg-destructive p-2 text-sm text-destructive-foreground">
      {message}
    </p>
  );
};

export default ErrorMessage;
