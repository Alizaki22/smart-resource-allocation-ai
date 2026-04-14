const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  const res = await predict({ input });
  setResult(res.result);
  setLoading(false);
};
