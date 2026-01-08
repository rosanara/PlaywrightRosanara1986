export default class parameterization{

    static makeAppoinmentTestData() { 
        return [
            {testID:'TC001', facility: 'Tokyo CURA Healthcare Center',  hcp: 'Medicare', visitDate: '2024-10-10', comment: 'This is for testing'},
            {testID:'TC002', facility: 'Hongkong CURA Healthcare Center', hcp: 'Medicaid', visitDate: '2024-11-11', comment: 'This is for testing purpose'},
            {testID:'TC003', facility: 'Seoul CURA Healthcare Center', hcp: 'None', visitDate: '2024-12-12', comment: 'Automation testing'}
        ]
    }
}