function DeleteData({ userId, userName, onDelete }) {
  const handleDelete = async () => {
    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${userName}"?`
    );
    
    if (confirmed) {
      // Call parent's onDelete function
      await onDelete(userId);
    }
  };

  return (
    <button 
      className="btn btn-delete" 
      onClick={handleDelete}
    >
      🗑️ Delete
    </button>
  );
}

export default DeleteData;
