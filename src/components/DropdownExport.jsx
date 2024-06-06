import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportDropdownButton = ({ htmlId, fileName = 'document' }) => {
    const exportToPDF = () => {
        const input = document.getElementById(htmlId);
        const padding = 20;
        input.style.padding = `${padding}px`;

        html2canvas(input, { useCORS: true })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210 - 2 * padding;
                const pageHeight = 297 - 2 * padding;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', padding, position + padding, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', padding, position + padding, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(`${fileName}.pdf`);
                input.style.padding = '';
            })
            .catch(() => {});
    };

    const handleExport = (format) => {
        if (format === 'pdf') {
            exportToPDF();
        }
    };

    return (
        <div className='dropdown'>
            <button className='dropbtn'>Export to</button>
            <div className='dropdown-content'>
                <a href='#' onClick={() => handleExport('pdf')}>
                    PDF
                </a>
                <a href='#' onClick={() => handleExport('csv')}>
                    CSV
                </a>
                <a href='#' onClick={() => handleExport('json')}>
                    JSON
                </a>
            </div>
        </div>
    );
};

export default ExportDropdownButton;
