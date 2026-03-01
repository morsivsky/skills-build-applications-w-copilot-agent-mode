import { useEffect, useState } from 'react';

function Workouts() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${baseUrl}/api/workouts/`;

    console.log('Workouts endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Workouts fetched data:', data);
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        setItems(normalized);
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Failed to fetch workouts');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const value = `${item.user || ''} ${item.workout || ''} ${item.suggestion || ''}`.toLowerCase();
    return value.includes(search.toLowerCase());
  });

  const closeModal = () => setSelectedItem(null);

  if (loading) {
    return <p className="text-muted">Loading workouts...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Workouts</h2>
          <a className="link-primary" href="#workouts-table">
            Jump to table
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              placeholder="Search workouts"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button className="btn btn-primary w-100" type="button" onClick={() => setSearch('')}>
              Clear
            </button>
            <button className="btn btn-outline-secondary w-100" type="submit">
              Filter
            </button>
          </div>
        </form>

        <div className="table-responsive" id="workouts-table">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Workout</th>
                <th>Suggestion</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id || `${item.user}-${item.workout}`}>
                  <td>{item.user}</td>
                  <td>{item.workout}</td>
                  <td>{item.suggestion}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedItem(item)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem ? (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout details</h5>
                  <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p className="mb-1"><strong>User:</strong> {selectedItem.user}</p>
                  <p className="mb-1"><strong>Workout:</strong> {selectedItem.workout}</p>
                  <p className="mb-0"><strong>Suggestion:</strong> {selectedItem.suggestion}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={closeModal}></div>
        </>
      ) : null}
    </div>
  );
}

export default Workouts;