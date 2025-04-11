const UBHistory = ({history}) => {
    const {issue_date, return_date, user, issued_book} = history;
  return (
    <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">                                
            <td className="px-6 py-4">
                {user.name}
            </td>
            <td className="px-6 py-4">
                {/* {issued_book.title.slice(0, 10) + (issued_book.title.length > 15 ? "..." : "")} */}
                {issued_book.title}
            </td>
            <td className="px-6 py-4">
                {issue_date ? new Date(issue_date).toLocaleDateString() : 'Not issued'}
            </td>
            <td className="px-6 py-4">
                {return_date ? new Date(return_date).toLocaleDateString() : 'Not returned'}
            </td>
        </tr>  
    </>
  )
}

export default UBHistory;