import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import { getStonkData } from '../../store/stocks';



export default function SmallStockGraph()
