import {useRef, useState} from "react";
import {Table, Typography, Input, Button, Space, InputRef, Pagination} from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

type DataIndex = keyof any;
export default function ProjectSelect() {
    const searchInput = useRef<InputRef>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [searchedColumn, setSearchedColumn] = useState<DataIndex>();

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<any> => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                             close,
                         }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={'프로젝트명으로 검색'}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys as string[], confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        검색
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        초기화
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        style={{ color: "#000" }}
                        onClick={() => {
                            close();
                        }}
                    >
                        닫기
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? "#A843D6" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: "#FFE06877", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ""}
            />
        ) : (
            text
        ),
    })
    const columns: ColumnsType<any> = [
        {
            title: <Typography.Text>프로젝트명</Typography.Text>,
            key: "projectNm",
            dataIndex: "projectNm",
            width: 300,
            ...getColumnSearchProps("projectNm")
        },
        {
            title: <Typography.Text>생성일</Typography.Text>,
            key: "createdDate",
            dataIndex: "createdDate",
            width: 10,
            sorter: {
                compare: (a, b) => a.createdDate - b.createdDate
            }
        },

    ]

    const dataSource = [
        {
            key: '1',
            projectNm: 'project01',
            createdDate: '2024-01-01'
        },
        {
            key: '2',
            projectNm: 'project02',
            createdDate: '2024-01-02'
        }
    ]

    return <div className="w-full h-full p-2 text-center">
        <div className="bg-white pb-5 rounded-md">
            <div className="mt-12 h-[500px]">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
            <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                total={2}
                defaultPageSize={8}
            />
        </div>
    </div>
}