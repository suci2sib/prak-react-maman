export default function PageHeader(props) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold font-poppins">
                    Dashboard
                    {props.title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span className="text-gray-500 font-barlow">Dashboard</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-500 font-barlow">Order List</span>
                </div>
            </div>
            <div id="action-button">
                <button className="bg-hijau text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90">
                    Add Button
                </button>
            </div>
        </div>
    );
}