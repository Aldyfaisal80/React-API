const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-y-scroll  ">
            {children}
        </table>
    )
}

const tableHead = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className="bg-gray-200">
            {children}
        </thead>
    )
}


const tableBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <tbody className="text-gray-700">
            {children}
        </tbody>
    )
}


const tableRow = ({ children }: { children: React.ReactNode }) => {
    return (
        <tr>
            {children}
        </tr>
    )
}

const tableCell = ({ children }: { children: React.ReactNode }) => {
    return (
        <td className="border-gray-300 border-2 p-3 text-center">
            {children}
        </td>
    )
}

Table.Head = tableHead
Table.Body = tableBody
Table.Row = tableRow
Table.Cell = tableCell

export default Table