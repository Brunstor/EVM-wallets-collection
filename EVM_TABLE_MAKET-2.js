 var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2000,
  maxValidYear: 2021,
  inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
};
 
 
 let gridApi;

const gridOptions = {
  columnDefs: [
  {
      field: 'ID',editable: true,filter: 'agSetColumnFilter', pinned: 'left',
	  },
    {
      headerName: 'Wallet info',
      children: [{ field: 'Address',editable: true, filter: 'agSetColumnFilter' },{ field: 'Private Key',editable: true, filter: 'agSetColumnFilter', columnGroupShow: 'open' }],
    },
    {
      headerName: 'Statistics',
      children: [
        { headerName: 'Timestamp',
			children: [ { field: 'Last TX', filter: 'agDateColumnFilter', filterParams: filterParams },
						{ field: 'Age', filter: 'agNumberColumnFilter', columnGroupShow: 'open' },
						{ field: 'First TX', filter: 'agDateColumnFilter', filterParams: filterParams, columnGroupShow: 'open' }],},
		
	
		{ headerName: 'Total Stats',
			children: [ { field: 'Total Balance', filter: 'agNumberColumnFilter' },
						{ field: 'Total TX', filter: 'agNumberColumnFilter', columnGroupShow: 'open' },
						{ field: 'Total Fee', filter: 'agNumberColumnFilter', columnGroupShow: 'open' }]},
        { headerName: 'L1 EVM Stats',
			children: [ { headerName: 'Ethereum', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field',
							children: [
								{ headerName: 'ETH Balance', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field' },								
								{ headerName: 'ETH TX', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },
								{ headerName: 'First ETX TX', filter: 'agDateColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },
								{ headerName: 'Last ETH TX', filter: 'agDateColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },
								{ headerName: 'ETH Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },
								{ headerName: 'ETX Contracts', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },
								{ headerName: 'ETX Fee', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },
			{ headerName: 'ETX Volume', filter: 'agNumberColumnFilter', headerClass: 'eth-header', cellClass: 'eth-field', columnGroupShow: 'open' },],},
						{ headerName: 'Polygon', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field',
							children: [
								{ headerName: 'POL Balance', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field' },
								{ headerName: 'POL TX', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },								
								{ headerName: 'First POL TX', filter: 'agDateColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },
								{ headerName: 'Last POL TX', filter: 'agDateColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },
								{ headerName: 'POL Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },
								{ headerName: 'POL Contracts', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },
								{ headerName: 'POL Fee', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },
			{ headerName: 'POL Volume', filter: 'agNumberColumnFilter', headerClass: 'polygon-header', cellClass: 'polygon-field', columnGroupShow: 'open' },],},
						{ headerName: 'BSC', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field',
							children: [
								{ headerName: 'BSC Balance', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field' },
								{ headerName: 'BSC TX', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },								
								{ headerName: 'First BSC TX', filter: 'agDateColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },
								{ headerName: 'Last BSC TX', filter: 'agDateColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },
								{ headerName: 'BSC Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },
								{ headerName: 'BSC Contracts', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },
								{ headerName: 'BSC Fee', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },
			{ headerName: 'BSC Volume', filter: 'agNumberColumnFilter', headerClass: 'BSC-header', cellClass: 'BSC-field', columnGroupShow: 'open' },],},
						{ headerName: 'Avalanche', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field',
							children: [
								{ headerName: 'AVAX Balance', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field' },
								{ headerName: 'AVAX TX', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },								
								{ headerName: 'First AVAX TX', filter: 'agDateColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },
								{ headerName: 'Last AVAX TX', filter: 'agDateColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },
								{ headerName: 'AVAX Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },
								{ headerName: 'AVAX Contracts', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },
								{ headerName: 'AVAX Fee', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },
			{ headerName: 'AVAX Volume', filter: 'agNumberColumnFilter', headerClass: 'AVAX-header', cellClass: 'AVAX-field', columnGroupShow: 'open' },],},
						{ headerName: 'Gnosis', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'Gnosis Balance', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field' },
								{ headerName: 'Gnosis TX', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },								
								{ headerName: 'First Gnosis TX', filter: 'agDateColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },
								{ headerName: 'Last Gnosis TX', filter: 'agDateColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },
								{ headerName: 'Gnosis Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },
								{ headerName: 'Gnosis Contracts', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },
								{ headerName: 'Gnosis Fee', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },
			{ headerName: 'gnosis Volume', filter: 'agNumberColumnFilter', headerClass: 'gnosis-header', cellClass: 'gnosis-field', columnGroupShow: 'open' },],},
						{ headerName: 'Fantom', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'FTM Balance', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field' },
								{ headerName: 'FTM TX', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },								
								{ headerName: 'First FTM TX', filter: 'agDateColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },
								{ headerName: 'Last FTM TX', filter: 'agDateColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },
								{ headerName: 'FTM Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },
								{ headerName: 'FTM Contracts', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },
								{ headerName: 'FTM Fee', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },
			{ headerName: 'fantom Volume', filter: 'agNumberColumnFilter', headerClass: 'fantom-header', cellClass: 'fantom-field', columnGroupShow: 'open' },],},
						{ headerName: 'CELO', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'CELO Balance', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field' },
								{ headerName: 'CELO TX', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },								
								{ headerName: 'First CELO TX', filter: 'agDateColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },
								{ headerName: 'Last CELO TX', filter: 'agDateColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },
								{ headerName: 'CELO Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },
								{ headerName: 'CELO Contracts', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },
								{ headerName: 'CELO Fee', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },
			{ headerName: 'celo Volume', filter: 'agNumberColumnFilter', headerClass: 'celo-header', cellClass: 'celo-field', columnGroupShow: 'open' },],},
						{ headerName: 'KAVA', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'KAVA Balance', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field' },
								{ headerName: 'KAVA TX', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },								
								{ headerName: 'First KAVA TX', filter: 'agDateColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },
								{ headerName: 'Last KAVA TX', filter: 'agDateColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },
								{ headerName: 'KAVA Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },
								{ headerName: 'KAVA Contracts', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },
								{ headerName: 'KAVA Fee', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },
			{ headerName: 'kava Volume', filter: 'agNumberColumnFilter', headerClass: 'kava-header', cellClass: 'kava-field', columnGroupShow: 'open' },],},
						{ headerName: 'Moonbeam', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'GLMR Balance', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field' },
								{ headerName: 'GLMR TX', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },								
								{ headerName: 'First GLMR TX', filter: 'agDateColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },
								{ headerName: 'Last GLMR TX', filter: 'agDateColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },
								{ headerName: 'GLMR Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },
								{ headerName: 'GLMR Contracts', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },
								{ headerName: 'GLMR Fee', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },
			{ headerName: 'moonbeam Volume', filter: 'agNumberColumnFilter', headerClass: 'moonbeam-header', cellClass: 'moonbeam-field', columnGroupShow: 'open' },],},
			{ headerName: 'Moonriver', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'MOVR Balance', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field' },
								{ headerName: 'MOVR TX', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },								
								{ headerName: 'First MOVR TX', filter: 'agDateColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },
								{ headerName: 'Last MOVR TX', filter: 'agDateColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },
								{ headerName: 'MOVR Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },
								{ headerName: 'MOVR Contracts', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },
								{ headerName: 'MOVR Fee', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },
			{ headerName: 'moonriver Volume', filter: 'agNumberColumnFilter', headerClass: 'moonriver-header', cellClass: 'moonriver-field', columnGroupShow: 'open' },],}
						],
						
						},
        { headerName: 'L2 EVM Stats',
			children: [ { headerName: 'ZK-Sync', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field',
							children: [
								{ headerName: 'ZKS Balance', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field' },								
								{ headerName: 'ZKS TX', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },
								{ headerName: 'First ZKS TX', filter: 'agDateColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },
								{ headerName: 'Last ZKS TX', filter: 'agDateColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },
								{ headerName: 'ZKS Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },
								{ headerName: 'ZKS Contracts', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },
								{ headerName: 'ZKS Fee', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },
			{ headerName: 'ZKS Volume', filter: 'agNumberColumnFilter', headerClass: 'ZK-sync-header', cellClass: 'ZK-sync-field', columnGroupShow: 'open' },],},
						{ headerName: 'Optimism', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field',
							children: [
								{ headerName: 'OP Balance', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field' },
								{ headerName: 'OP TX', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },								
								{ headerName: 'First OP TX', filter: 'agDateColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },
								{ headerName: 'Last OP TX', filter: 'agDateColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },
								{ headerName: 'OP Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },
								{ headerName: 'OP Contracts', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },
								{ headerName: 'OP Fee', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },
			{ headerName: 'OP Volume', filter: 'agNumberColumnFilter', headerClass: 'optimism-header', cellClass: 'optimism-field', columnGroupShow: 'open' },],},	
						{ headerName: 'Arbitrum', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field',
							children: [
								{ headerName: 'ARB Balance', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field' },
								{ headerName: 'ARB TX', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },								
								{ headerName: 'First ARB TX', filter: 'agDateColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },
								{ headerName: 'Last ARB TX', filter: 'agDateColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },
								{ headerName: 'ARB Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },
								{ headerName: 'ARB Contracts', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },
								{ headerName: 'ARB Fee', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },
			{ headerName: 'ARB Volume', filter: 'agNumberColumnFilter', headerClass: 'arbitrum-header', cellClass: 'arbitrum-field', columnGroupShow: 'open' },],},	
			{ headerName: 'Scroll', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field',
							children: [
								{ headerName: 'SCROLL Balance', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field' },
								{ headerName: 'SCROLL TX', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },								
								{ headerName: 'First SCROLL TX', filter: 'agDateColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },
								{ headerName: 'Last SCROLL TX', filter: 'agDateColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },
								{ headerName: 'SCROLL Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },
								{ headerName: 'SCROLL Contracts', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },
								{ headerName: 'SCROLL Fee', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },
			{ headerName: 'SCROLL Volume', filter: 'agNumberColumnFilter', headerClass: 'scroll-header', cellClass: 'scroll-field', columnGroupShow: 'open' },],},	
			{ headerName: 'Linea', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'Linea Balance', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field' },
								{ headerName: 'Linea TX', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },								
								{ headerName: 'First Linea TX', filter: 'agDateColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },
								{ headerName: 'Last Linea TX', filter: 'agDateColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },
								{ headerName: 'Linea Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },
								{ headerName: 'Linea Contracts', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },
								{ headerName: 'Linea Fee', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },
			{ headerName: 'Linea Volume', filter: 'agNumberColumnFilter', headerClass: 'Linea-header', cellClass: 'Linea-field', columnGroupShow: 'open' },],},
			{ headerName: 'Base', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'Base Balance', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field' },
								{ headerName: 'Base TX', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },								
								{ headerName: 'First Base TX', filter: 'agDateColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },
								{ headerName: 'Last Base TX', filter: 'agDateColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },
								{ headerName: 'Base Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },
								{ headerName: 'Base Contracts', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },
								{ headerName: 'Base Fee', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },
			{ headerName: 'Base Volume', filter: 'agNumberColumnFilter', headerClass: 'Base-header', cellClass: 'Base-field', columnGroupShow: 'open' },],},
			{ headerName: 'ZK-EVM', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'ZK-EVM Balance', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field' },
								{ headerName: 'ZK-EVM TX', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },								
								{ headerName: 'First ZK-EVM TX', filter: 'agDateColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },
								{ headerName: 'Last ZK-EVM TX', filter: 'agDateColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },
								{ headerName: 'ZK-EVM Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },
								{ headerName: 'ZK-EVM Contracts', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },
								{ headerName: 'ZK-EVM Fee', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },
			{ headerName: 'ZK-EVM Volume', filter: 'agNumberColumnFilter', headerClass: 'ZK-EVM-header', cellClass: 'ZK-EVM-field', columnGroupShow: 'open' },],},
			{ headerName: 'Zora', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'Zora Balance', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field' },
								{ headerName: 'Zora TX', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },								
								{ headerName: 'First Zora TX', filter: 'agDateColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },
								{ headerName: 'Last Zora TX', filter: 'agDateColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },
								{ headerName: 'Zora Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },
								{ headerName: 'Zora Contracts', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },
								{ headerName: 'Zora Fee', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },
			{ headerName: 'Zora Volume', filter: 'agNumberColumnFilter', headerClass: 'Zora-header', cellClass: 'Zora-field', columnGroupShow: 'open' },],},
			{ headerName: 'Nova', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'Nova Balance', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field' },
								{ headerName: 'Nova TX', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },								
								{ headerName: 'First Nova TX', filter: 'agDateColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },
								{ headerName: 'Last Nova TX', filter: 'agDateColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },
								{ headerName: 'Nova Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },
								{ headerName: 'Nova Contracts', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },
								{ headerName: 'Nova Fee', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },
			{ headerName: 'Nova Volume', filter: 'agNumberColumnFilter', headerClass: 'Nova-header', cellClass: 'Nova-field', columnGroupShow: 'open' },],},
			{ headerName: 'ZKFair', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open',
							children: [
								{ headerName: 'ZKFair Balance', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field' },
								{ headerName: 'ZKFair TX', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },								
								{ headerName: 'First ZKFair TX', filter: 'agDateColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },
								{ headerName: 'Last ZKFair TX', filter: 'agDateColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },
								{ headerName: 'ZKFair Active M/W/D', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },
								{ headerName: 'ZKFair Contracts', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },
								{ headerName: 'ZKFair Fee', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },
			{ headerName: 'ZKFair Volume', filter: 'agNumberColumnFilter', headerClass: 'ZKFair-header', cellClass: 'ZKFair-field', columnGroupShow: 'open' },],},
	],},
    
  ],},], 
  enableRangeSelection: true,
  defaultColDef: {
    editable: true,
    cellDataType: false,
  },
   sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
  },
  defaultColDef: {
    flex: 1,
  },
  columnHoverHighlight: true,
  
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  gridApi = agGrid.createGrid(gridDiv, gridOptions);
  
  


	fetch('tables/TEST_EVM_WALLETS_5.json')
    .then((response) => response.json())
    .then((data) => gridApi.setGridOption('rowData', data)); 
});

