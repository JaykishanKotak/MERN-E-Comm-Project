import { Helmet, HelmetProvider } from "react-helmet-async";

//Title is website visible part
//description is html part
const MetaComponent = ({
  title = "Best online shop",
  description = "Example description",
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaComponent;
