import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(elementId = 'resume-preview') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Resume element not found');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  let position = 0;
  const pageHeight = pdf.internal.pageSize.getHeight();

  if (pdfHeight <= pageHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  } else {
    let heightLeft = pdfHeight;
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save('resume.pdf');
}

export async function exportToDOCX(resumeData) {
  const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = await import('docx');

  const { fullName, email, phone, location, summary, experience, education, skills, projects } = resumeData;

  const contactLine = [email, phone, location].filter(Boolean).join(' | ');

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: fullName,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [new TextRun({ text: contactLine, color: '666666', size: 20 })],
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ text: '' }),

        ...(summary ? [
          new Paragraph({ text: 'PROFESSIONAL SUMMARY', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: summary }),
          new Paragraph({ text: '' }),
        ] : []),

        ...(experience?.length ? [
          new Paragraph({ text: 'EXPERIENCE', heading: HeadingLevel.HEADING_2 }),
          ...experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.title || '', bold: true }),
                new TextRun({ text: ` — ${exp.company || ''}`, color: '888888' }),
              ]
            }),
            new Paragraph({
              children: [new TextRun({ text: `${exp.startDate || ''} – ${exp.endDate || 'Present'}`, color: '999999', size: 18 })]
            }),
            ...(exp.description ? exp.description.split('\n').filter(Boolean).map(line =>
              new Paragraph({ text: `• ${line}`, indent: { left: 360 } })
            ) : []),
            new Paragraph({ text: '' }),
          ]),
        ] : []),

        ...(education?.length ? [
          new Paragraph({ text: 'EDUCATION', heading: HeadingLevel.HEADING_2 }),
          ...education.flatMap(edu => [
            new Paragraph({ children: [new TextRun({ text: edu.degree || '', bold: true })] }),
            new Paragraph({ children: [new TextRun({ text: `${edu.school || ''} | ${edu.year || ''}`, color: '888888' })] }),
            new Paragraph({ text: '' }),
          ]),
        ] : []),

        ...(skills?.length ? [
          new Paragraph({ text: 'SKILLS', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: skills.join(' • ') }),
          new Paragraph({ text: '' }),
        ] : []),

        ...(projects?.length ? [
          new Paragraph({ text: 'PROJECTS', heading: HeadingLevel.HEADING_2 }),
          ...projects.flatMap(proj => [
            new Paragraph({ children: [new TextRun({ text: proj.name || '', bold: true })] }),
            new Paragraph({ text: proj.description || '' }),
            new Paragraph({ text: '' }),
          ]),
        ] : []),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'resume.docx'; a.click();
  URL.revokeObjectURL(url);
}

export async function exportToPPT(resumeData) {
  const pptxgen = (await import('pptxgenjs')).default;
  const prs = new pptxgen();
  prs.layout = 'LAYOUT_WIDE';

  const { fullName, email, phone, summary, skills, experience, education } = resumeData;

  // Slide 1: Title
  const s1 = prs.addSlide();
  s1.background = { color: '1a1a2e' };
  s1.addText(fullName || 'Your Name', {
    x: 0.5, y: 1.5, w: '90%', h: 1.2,
    fontSize: 48, bold: true, color: 'FFFFFF',
    fontFace: 'Georgia',
  });
  s1.addText([{ text: email || '' }, { text: '  •  ' }, { text: phone || '' }], {
    x: 0.5, y: 2.9, w: '90%', h: 0.5,
    fontSize: 18, color: 'D4A853',
  });
  if (summary) {
    s1.addText(summary, {
      x: 0.5, y: 3.6, w: '90%', h: 1.8,
      fontSize: 14, color: 'CCCCCC', italic: true,
    });
  }

  // Slide 2: Experience
  if (experience?.length) {
    const s2 = prs.addSlide();
    s2.background = { color: 'FAFAF8' };
    s2.addText('EXPERIENCE', { x: 0.5, y: 0.3, w: '90%', h: 0.6, fontSize: 28, bold: true, color: '1a1a2e' });
    experience.slice(0, 3).forEach((exp, i) => {
      const y = 1.1 + i * 1.5;
      s2.addText(`${exp.title} — ${exp.company}`, { x: 0.5, y, w: '70%', h: 0.4, fontSize: 16, bold: true, color: '333333' });
      s2.addText(`${exp.startDate} – ${exp.endDate || 'Present'}`, { x: '72%', y, w: '25%', h: 0.4, fontSize: 13, color: '888888', align: 'right' });
      if (exp.description) {
        s2.addText(exp.description.substring(0, 180) + '...', { x: 0.5, y: y + 0.45, w: '90%', h: 0.8, fontSize: 12, color: '666666' });
      }
    });
  }

  // Slide 3: Skills & Education
  const s3 = prs.addSlide();
  s3.background = { color: '1a1a2e' };
  s3.addText('SKILLS', { x: 0.5, y: 0.3, w: '90%', h: 0.6, fontSize: 28, bold: true, color: 'D4A853' });
  if (skills?.length) {
    const skillRows = [];
    for (let i = 0; i < skills.length; i += 4) {
      skillRows.push(skills.slice(i, i + 4).join('   •   '));
    }
    s3.addText(skillRows.join('\n'), { x: 0.5, y: 1.1, w: '90%', h: 2.5, fontSize: 14, color: 'FFFFFF' });
  }
  if (education?.length) {
    s3.addText('EDUCATION', { x: 0.5, y: 4, w: '90%', h: 0.5, fontSize: 20, bold: true, color: 'D4A853' });
    education.forEach((edu, i) => {
      s3.addText(`${edu.degree} — ${edu.school} (${edu.year})`, {
        x: 0.5, y: 4.6 + i * 0.5, w: '90%', h: 0.45, fontSize: 14, color: 'CCCCCC',
      });
    });
  }

  await prs.writeFile({ fileName: 'resume.pptx' });
}
