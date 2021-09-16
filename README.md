if (a.task < b.task) return 1; // z-a
// if (a.task > b.task) return 1; // usual
if (a.task < b.task) return -1; a-z

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("fetching data is interrupted");
      const tasks = await response.json();
      console.log(tasks);
      setItems(tasks);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);
