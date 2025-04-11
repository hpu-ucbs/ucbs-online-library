const UFHistory = ({history}) => {
    const {fine_alloted_on, fine_paid_on, amount, user} = history;
  return (
    <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
            </th>
            <td className="px-6 py-4">
                {amount}
            </td>
            <td className="px-6 py-4">
                {fine_alloted_on ? new Date(fine_alloted_on).toLocaleDateString() : "Not alloted"}
            </td>
            <td className="px-6 py-4">
                {fine_paid_on ? new Date(fine_paid_on).toLocaleDateString() : "Not paid"}
            </td>
        </tr>
    </>
  )
}

export default UFHistory;