type PageHeaderProps = {
  text: string;
};

const PageHeader = ({ text }: PageHeaderProps) => {
  return <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{text}</h2>;
};

export { PageHeader };
