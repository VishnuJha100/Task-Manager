import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ToolTip,
    ResponsiveContainer,
    Legend
} from "recharts"
import CustomTooltip from './CustomToolTip'
import CustomLegend from './CustomLegend'

const CustomPieChart = ({data, colors}) => {
  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={130} innerRadius={100} labelLine={false}>
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <ToolTip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
