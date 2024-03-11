import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    setPrintShow,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import OrderDetails from './OrderDetails'

const orderStatusColor = {
    0: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Failed', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const PaymentMethodImage = ({ paymentMehod, className }) => {
    switch (paymentMehod) {
        case 'visa':
            return (
                <img
                    className={className}
                    src="/img/others/img-8.png"
                    alt={paymentMehod}
                />
            )
        case 'master':
            return (
                <img
                    className={className}
                    src="/img/others/img-9.png"
                    alt={paymentMehod}
                />
            )
        case 'paypal':
            return (
                <img
                    className={className}
                    src="/img/others/img-10.png"
                    alt={paymentMehod}
                />
            )
        default:
            return <></>
    }
}

const OrderColumn = ({ row, onClick }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        onClick(row.id)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const ActionColumn = ({ row, onClick }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        onClick(row.id)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
        </div>
    )
}

const OrdersTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useSelector((state) => state.salesOrderList.data.loading)

    const data = useSelector((state) => state.salesOrderList.data.orderList)

    const printShow = useSelector(
        (state) => state.salesOrderList.state.printShow
    )

    const [selectedOrder, setSelectedOrder] = useState(null)

    const fetchData = useCallback(() => {
        dispatch(getOrders({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns = useMemo(
        () => [
            {
                header: 'Order',
                accessorKey: 'orderId',
                cell: (props) => (
                    <OrderColumn
                        row={props.row.original}
                        onClick={(id) => setSelectedOrder(id)}
                    />
                ),
            },
            {
                header: 'Date',
                accessorKey: 'placedAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.placedAt).format('DD/MM/YYYY')}</span>
                    )
                },
            },
            {
                header: 'Date',
                accessorKey: 'deliverAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>{dayjs(row.deliverAt).format('DD/MM/YYYY')}</span>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge
            //                     className={orderStatusColor[status].dotClass}
            //                 />
            //                 <span
            //                     className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
            //                 >
            //                     {orderStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Payment Method',
            //     accessorKey: 'paymentMehod',
            //     cell: (props) => {
            //         const { paymentMehod, paymentIdendifier } =
            //             props.row.original
            //         return (
            //             <span className="flex items-center">
            //                 <PaymentMethodImage
            //                     className="max-h-[20px]"
            //                     paymentMehod={paymentMehod}
            //                 />
            //                 <span className="ltr:ml-2 rtl:mr-2">
            //                     {paymentIdendifier}
            //                 </span>
            //             </span>
            //         )
            //     },
            // },
            {
                header: 'Qty',
                accessorKey: 'qty',
                cell: (props) => {
                    const { qty } = props.row.original
                    return (
                        <NumberFormat
                            displayType="text"
                            value={(Math.round(qty * 100) / 100).toFixed(2)}
                            prefix={'$'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: 'Done',
                accessorKey: 'done',
                cell: (props) => {
                    const { done } = props.row.original
                    return (
                        <div className="flex items-center">
                            {done ? (
                                <Badge
                                    className="bg-green-500 text-green-50"
                                    content="Done"
                                />
                            ) : (
                                <Badge
                                    className="bg-red-500 text-red-50"
                                    content="Not done"
                                />
                            )}
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
                        onClick={(id) => setSelectedOrder(id)}
                    />
                ),
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            // if (checked) {
            //     const originalRows = rows.map((row) => row.original)
            //     const selectedIds = []
            //     originalRows.forEach((row) => {
            //         selectedIds.push(row.id)
            //     })
            //     dispatch(setSelectedRows(selectedIds))
            // } else {
            //     dispatch(setSelectedRows([]))
            // }
        },
        [dispatch]
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                // selectable
            />
            <Dialog
                isOpen={selectedOrder != null}
                width={'lg'}
                onClose={() => {
                    setSelectedOrder(null)
                }}
            >
                <div className="pt-10">
                    <OrderDetails id={selectedOrder} />
                </div>
            </Dialog>
            <Dialog
                isOpen={printShow}
                onClose={() => dispatch(setPrintShow(false))}
            >
            <div className='pt-10'>

            </div>
            </Dialog>
        </>
    )
}

export default OrdersTable
