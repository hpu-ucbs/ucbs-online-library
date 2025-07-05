const UBHistory = ({history}) => {
    const {issue_date, return_date, user, issued_book} = history;
    
    // Safe access to nested properties
    const userName = user?.name || 'Unknown User';
    const bookTitle = issued_book?.title || 'Unknown Book';
    
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">                                
                <td className="px-1.5 sm:px-6 py-4 border-gray-700 border">
                    {userName}
                </td>
                <td className="px-1.5 sm:px-6 py-4 border-gray-700 border">
                    {bookTitle}
                </td>
                <td className="px-1.5 sm:px-6 py-4 border-gray-700 border">
                    {issue_date ? new Date(issue_date).toLocaleDateString() : 'Not issued'}
                </td>
                <td className="px-1.5 sm:px-6 py-4 border-gray-700 border">
                    {return_date ? new Date(return_date).toLocaleDateString() : 'Not returned'}
                </td>
            </tr>  
        </>
    )
}

export default UBHistory;