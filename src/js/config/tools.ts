// This file centralizes the definition of all available tools, organized by category.
const baseCategories = [
  {
    name: 'Popular Tools',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'fluxo-de-trabalho-pdf.html',
        name: 'PDF Workflow Builder',
        icon: 'ph-tree-structure',
        subtitle:
          'Build custom PDF processing pipelines with a visual node editor.',
      },
      {
        href: import.meta.env.BASE_URL + 'ferramentas-pdf.html',
        name: 'PDF Multi Tool',
        icon: 'ph-pencil-ruler',
        subtitle:
          'Merge, Split, Organize, Delete, Rotate, Add Blank Pages, Extract and Duplicate in an unified interface.',
      },
      {
        href: import.meta.env.BASE_URL + 'juntar-pdf.html',
        name: 'Merge PDF',
        icon: 'ph-browsers',
        subtitle: 'Combine multiple PDFs into one file. Preserves Bookmarks.',
      },
      {
        href: import.meta.env.BASE_URL + 'dividir-pdf.html',
        name: 'Split PDF',
        icon: 'ph-scissors',
        subtitle: 'Extract a range of pages into a new PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'comprimir-pdf.html',
        name: 'Compress PDF',
        icon: 'ph-lightning',
        subtitle: 'Reduce the file size of your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'editar-pdf.html',
        name: 'PDF Editor',
        icon: 'ph-pencil-simple',
        subtitle:
          'Annotate, highlight, redact, comment, add shapes/images, search, and view PDFs',
      },
      {
        href: import.meta.env.BASE_URL + 'jpg-para-pdf.html',
        name: 'JPG to PDF',
        icon: 'ph-file-jpg',
        subtitle: 'Create a PDF from one or more JPG images.',
      },
      {
        href: import.meta.env.BASE_URL + 'assinar-pdf.html',
        name: 'Sign PDF',
        icon: 'ph-pen-nib',
        subtitle: 'Draw, type, or upload your signature.',
      },
      {
        href: import.meta.env.BASE_URL + 'cortar-pdf.html',
        name: 'Crop PDF',
        icon: 'ph-crop',
        subtitle: 'Trim the margins of every page in your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'extrair-paginas-pdf.html',
        name: 'Extract Pages',
        icon: 'ph-squares-four',
        subtitle: 'Save a selection of pages as new files.',
      },
      {
        href: import.meta.env.BASE_URL + 'organizar-pdf.html',
        name: 'Duplicate & Organize',
        icon: 'ph-files',
        subtitle: 'Duplicate, reorder, and delete pages.',
      },
      {
        href: import.meta.env.BASE_URL + 'excluir-paginas-pdf.html',
        name: 'Delete Pages',
        icon: 'ph-trash',
        subtitle: 'Remove specific pages from your document.',
      },
    ],
  },
  {
    name: 'Edit & Annotate',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'editar-pdf.html',
        name: 'PDF Editor',
        icon: 'ph-pencil-simple',
        subtitle:
          'Annotate, highlight, redact, comment, add shapes/images, search, and view PDFs.',
      },
      {
        href: import.meta.env.BASE_URL + 'marcadores-pdf.html',
        name: 'Edit Bookmarks',
        icon: 'ph-bookmark',
        subtitle: 'Add, edit, import, delete and extract PDF bookmarks.',
      },
      {
        href: import.meta.env.BASE_URL + 'sumario-pdf.html',
        name: 'Table of Contents',
        icon: 'ph-list',
        subtitle: 'Generate a table of contents page from PDF bookmarks.',
      },
      {
        href: import.meta.env.BASE_URL + 'numerar-paginas-pdf.html',
        name: 'Page Numbers',
        icon: 'ph-list-numbers',
        subtitle: 'Insert page numbers into your document.',
      },
      {
        href: import.meta.env.BASE_URL + 'rotular-paginas-pdf.html',
        name: 'Add Page Labels',
        icon: 'ph-text-aa',
        subtitle:
          'Apply PDF page labels with Roman numerals, prefixes, and custom starts.',
      },
      {
        href: import.meta.env.BASE_URL + 'numeracao-bates-pdf.html',
        name: 'Bates Numbering',
        icon: 'ph-hash',
        subtitle: 'Add sequential Bates numbers across one or more PDF files.',
      },
      {
        href: import.meta.env.BASE_URL + 'marca-dagua-pdf.html',
        name: 'Add Watermark',
        icon: 'ph-drop',
        subtitle: 'Stamp text or an image over your PDF pages.',
      },
      {
        href: import.meta.env.BASE_URL + 'cabecalho-rodape-pdf.html',
        name: 'Header & Footer',
        icon: 'ph-paragraph',
        subtitle: 'Add text to the top and bottom of pages.',
      },
      {
        href: import.meta.env.BASE_URL + 'inverter-cores-pdf.html',
        name: 'Invert Colors',
        icon: 'ph-circle-half',
        subtitle: 'Create a "dark mode" version of your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'efeito-scanner-pdf.html',
        name: 'Scanner Effect',
        icon: 'ph-scan',
        subtitle: 'Make your PDF look like a scanned document.',
      },
      {
        href: import.meta.env.BASE_URL + 'ajustar-cores-pdf.html',
        name: 'Adjust Colors',
        icon: 'ph-sliders-horizontal',
        subtitle: 'Fine-tune brightness, contrast, saturation and more.',
      },
      {
        href: import.meta.env.BASE_URL + 'cor-de-fundo-pdf.html',
        name: 'Background Color',
        icon: 'ph-palette',
        subtitle: 'Change the background color of your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'cor-do-texto-pdf.html',
        name: 'Change Text Color',
        icon: 'ph-eyedropper',
        subtitle: 'Change the color of text in your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'assinar-pdf.html',
        name: 'Sign PDF',
        icon: 'ph-pen-nib',
        subtitle: 'Draw, type, or upload your signature.',
      },
      {
        href: import.meta.env.BASE_URL + 'carimbar-pdf.html',
        name: 'Add Stamps',
        icon: 'ph-stamp',
        subtitle: 'Add image stamps to your PDF using the annotation toolbar.',
      },
      {
        href: import.meta.env.BASE_URL + 'remover-anotacoes-pdf.html',
        name: 'Remove Annotations',
        icon: 'ph-eraser',
        subtitle: 'Strip comments, highlights, and links.',
      },
      {
        href: import.meta.env.BASE_URL + 'cortar-pdf.html',
        name: 'Crop PDF',
        icon: 'ph-crop',
        subtitle: 'Trim the margins of every page in your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'preencher-pdf.html',
        name: 'PDF Form Filler',
        icon: 'ph-pencil-line',
        subtitle:
          'Fill in forms directly in the browser. Also supports XFA forms.',
      },
      {
        href: import.meta.env.BASE_URL + 'criar-formulario-pdf.html',
        name: 'Create PDF Form',
        icon: 'ph-file-plus',
        subtitle: 'Create fillable PDF forms with drag-and-drop text fields.',
      },
      {
        href: import.meta.env.BASE_URL + 'remover-paginas-branco-pdf.html',
        name: 'Remove Blank Pages',
        icon: 'ph-file-minus',
        subtitle: 'Automatically detect and delete blank pages.',
      },
    ],
  },
  {
    name: 'Convert to PDF',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'imagem-para-pdf.html',
        name: 'Images to PDF',
        icon: 'ph-images',
        subtitle:
          'Convert JPG, PNG, BMP, GIF, TIFF, PNM, PGM, PBM, PPM, PAM, JXR, JPX, JP2, PSD, SVG, HEIC, WebP to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'jpg-para-pdf.html',
        name: 'JPG to PDF',
        icon: 'ph-file-jpg',
        subtitle: 'Create a PDF from one or more JPG images.',
      },
      {
        href: import.meta.env.BASE_URL + 'png-para-pdf.html',
        name: 'PNG to PDF',
        icon: 'ph-file-png',
        subtitle: 'Create a PDF from one or more PNG images.',
      },
      {
        href: import.meta.env.BASE_URL + 'webp-para-pdf.html',
        name: 'WebP to PDF',
        icon: 'ph-image',
        subtitle: 'Create a PDF from one or more WebP images.',
      },
      {
        href: import.meta.env.BASE_URL + 'svg-para-pdf.html',
        name: 'SVG to PDF',
        icon: 'ph-file-svg',
        subtitle: 'Create a PDF from one or more SVG images.',
      },
      {
        href: import.meta.env.BASE_URL + 'bmp-para-pdf.html',
        name: 'BMP to PDF',
        icon: 'ph-image',
        subtitle: 'Create a PDF from one or more BMP images.',
      },
      {
        href: import.meta.env.BASE_URL + 'heic-para-pdf.html',
        name: 'HEIC to PDF',
        icon: 'ph-device-mobile',
        subtitle: 'Create a PDF from one or more HEIC images.',
      },
      {
        href: import.meta.env.BASE_URL + 'tiff-para-pdf.html',
        name: 'TIFF to PDF',
        icon: 'ph-image',
        subtitle: 'Create a PDF from one or more TIFF images.',
      },
      {
        href: import.meta.env.BASE_URL + 'txt-para-pdf.html',
        name: 'Text to PDF',
        icon: 'ph-text-t',
        subtitle: 'Convert a plain text file into a PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'markdown-para-pdf.html',
        name: 'Markdown to PDF',
        icon: 'ph-markdown-logo',
        subtitle:
          'Convert Markdown to PDF with live preview and syntax highlighting.',
      },
      {
        href: import.meta.env.BASE_URL + 'json-para-pdf.html',
        name: 'JSON to PDF',
        icon: 'ph-file-code',
        subtitle: 'Convert JSON files to PDF format.',
      },
      {
        href: import.meta.env.BASE_URL + 'odt-para-pdf.html',
        name: 'ODT to PDF',
        icon: 'ph-file',
        subtitle: 'Convert ODT (OpenDocument Text) files to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'csv-para-pdf.html',
        name: 'CSV to PDF',
        icon: 'ph-file-csv',
        subtitle: 'Convert CSV (Comma-Separated Values) spreadsheets to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'rtf-para-pdf.html',
        name: 'RTF to PDF',
        icon: 'ph-file-text',
        subtitle: 'Convert RTF (Rich Text Format) documents to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'word-para-pdf.html',
        name: 'Word to PDF',
        icon: 'ph-microsoft-word-logo',
        subtitle: 'Convert Word documents (DOCX, DOC, ODT) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'excel-para-pdf.html',
        name: 'Excel to PDF',
        icon: 'ph-microsoft-excel-logo',
        subtitle: 'Convert Excel spreadsheets (XLSX, XLS, ODS) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'powerpoint-para-pdf.html',
        name: 'PowerPoint to PDF',
        icon: 'ph-microsoft-powerpoint-logo',
        subtitle: 'Convert PowerPoint presentations (PPTX, PPT, ODP) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'xps-para-pdf.html',
        name: 'XPS to PDF',
        icon: 'ph-scan',
        subtitle: 'Convert XPS/OXPS documents to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'mobi-para-pdf.html',
        name: 'MOBI to PDF',
        icon: 'ph-book-open-text',
        subtitle: 'Convert MOBI e-books to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'epub-para-pdf.html',
        name: 'EPUB to PDF',
        icon: 'ph-book-open-text',
        subtitle: 'Convert EPUB e-books to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'fb2-para-pdf.html',
        name: 'FB2 to PDF',
        icon: 'ph-book-bookmark',
        subtitle: 'Convert FictionBook (FB2) e-books to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'cbz-para-pdf.html',
        name: 'CBZ to PDF',
        icon: 'ph-book-open',
        subtitle: 'Convert comic book archives (CBZ/CBR) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'wpd-para-pdf.html',
        name: 'WPD to PDF',
        icon: 'ph-file-text',
        subtitle: 'Convert WordPerfect documents (WPD) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'wps-para-pdf.html',
        name: 'WPS to PDF',
        icon: 'ph-file-text',
        subtitle: 'Convert WPS Office documents to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'xml-para-pdf.html',
        name: 'XML to PDF',
        icon: 'ph-file-code',
        subtitle: 'Convert XML documents to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'pages-para-pdf.html',
        name: 'Pages to PDF',
        icon: 'ph-file-text',
        subtitle: 'Convert Apple Pages documents to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'odg-para-pdf.html',
        name: 'ODG to PDF',
        icon: 'ph-image',
        subtitle: 'Convert OpenDocument Graphics (ODG) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'ods-para-pdf.html',
        name: 'ODS to PDF',
        icon: 'ph-table',
        subtitle: 'Convert OpenDocument Spreadsheet (ODS) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'odp-para-pdf.html',
        name: 'ODP to PDF',
        icon: 'ph-presentation',
        subtitle: 'Convert OpenDocument Presentation (ODP) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'publisher-para-pdf.html',
        name: 'PUB to PDF',
        icon: 'ph-book-open',
        subtitle: 'Convert Microsoft Publisher (PUB) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'visio-para-pdf.html',
        name: 'VSD to PDF',
        icon: 'ph-git-branch',
        subtitle: 'Convert Microsoft Visio (VSD, VSDX) to PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'psd-para-pdf.html',
        name: 'PSD to PDF',
        icon: 'ph-image',
        subtitle:
          'Convert Adobe Photoshop (PSD) files to PDF. Multiple files supported.',
      },
      {
        href: import.meta.env.BASE_URL + 'email-para-pdf.html',
        name: 'Email to PDF',
        icon: 'ph-envelope',
        subtitle: 'Convert email files (EML, MSG) to PDF format.',
      },
    ],
  },
  {
    name: 'Convert from PDF',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'pdf-para-jpg.html',
        name: 'PDF to JPG',
        icon: 'ph-file-image',
        subtitle: 'Convert each PDF page into a JPG image.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-png.html',
        name: 'PDF to PNG',
        icon: 'ph-file-image',
        subtitle: 'Convert each PDF page into a PNG image.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-webp.html',
        name: 'PDF to WebP',
        icon: 'ph-file-image',
        subtitle: 'Convert each PDF page into a WebP image.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-bmp.html',
        name: 'PDF to BMP',
        icon: 'ph-file-image',
        subtitle: 'Convert each PDF page into a BMP image.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-tiff.html',
        name: 'PDF to TIFF',
        icon: 'ph-file-image',
        subtitle: 'Convert each PDF page into a TIFF image.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-cbz.html',
        name: 'PDF to CBZ',
        icon: 'ph-book-open',
        subtitle:
          'Convert a PDF into a CBZ (Comic Book Archive) file for comic readers.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-svg.html',
        name: 'PDF to SVG',
        icon: 'ph-file-code',
        subtitle: 'Convert each PDF page into a scalable vector graphic.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-csv.html',
        name: 'PDF to CSV',
        icon: 'ph-file-csv',
        subtitle: 'Extract tables from PDF and convert to CSV format.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-excel.html',
        name: 'PDF to Excel',
        icon: 'ph-microsoft-excel-logo',
        subtitle: 'Extract tables from PDF and convert to Excel (XLSX).',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-preto-e-branco.html',
        name: 'PDF to Greyscale',
        icon: 'ph-palette',
        subtitle: 'Convert all colors to black and white.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-json.html',
        name: 'PDF to JSON',
        icon: 'ph-file-code',
        subtitle: 'Convert PDF files to JSON format.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-word.html',
        name: 'PDF to Word',
        icon: 'ph-microsoft-word-logo',
        subtitle: 'Convert PDF files to editable Word documents.',
      },
      {
        href: import.meta.env.BASE_URL + 'extrair-imagens-pdf.html',
        name: 'Extract Images',
        icon: 'ph-download-simple',
        subtitle: 'Extract all embedded images from your PDF files.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-markdown.html',
        name: 'PDF to Markdown',
        icon: 'ph-markdown-logo',
        subtitle: 'Convert PDF text and tables to Markdown format.',
      },
      {
        href: import.meta.env.BASE_URL + 'preparar-pdf-para-ia.html',
        name: 'Prepare PDF for AI',
        icon: 'ph-sparkle',
        subtitle:
          'Extract PDF content as LlamaIndex JSON for RAG/LLM pipelines.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-texto.html',
        name: 'PDF to Text',
        icon: 'ph-text-aa',
        subtitle: 'Extract text from PDF files and save as plain text (.txt).',
      },
    ],
  },
  {
    name: 'Organize & Manage',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'ocr-pdf.html',
        name: 'OCR PDF',
        icon: 'ph-barcode',
        subtitle: 'Make a PDF searchable and copyable.',
      },
      {
        href: import.meta.env.BASE_URL + 'juntar-pdf.html',
        name: 'Merge PDF',
        icon: 'ph-browsers',
        subtitle: 'Combine multiple PDFs into one file.',
      },
      {
        href: import.meta.env.BASE_URL + 'intercalar-paginas-pdf.html',
        name: 'Alternate & Mix Pages',
        icon: 'ph-shuffle',
        subtitle:
          'Merge PDFs by alternating pages from each PDF. Preserves Bookmarks',
      },
      {
        href: import.meta.env.BASE_URL + 'organizar-pdf.html',
        name: 'Organize & Duplicate',
        icon: 'ph-files',
        subtitle: 'Duplicate, reorder, and delete pages.',
      },
      {
        href: import.meta.env.BASE_URL + 'sobrepor-pdf.html',
        name: 'PDF Overlay',
        icon: 'ph-stack-simple',
        subtitle: 'Overlay or underlay pages from one PDF onto another.',
      },
      {
        href: import.meta.env.BASE_URL + 'anexar-arquivo-pdf.html',
        name: 'Add Attachments',
        icon: 'ph-paperclip',
        subtitle: 'Embed one or more files into your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'extrair-anexos-pdf.html',
        name: 'Extract Attachments',
        icon: 'ph-download',
        subtitle: 'Extract all embedded files from PDF(s) as a ZIP.',
      },
      {
        href: import.meta.env.BASE_URL + 'editar-anexos-pdf.html',
        name: 'Edit Attachments',
        icon: 'ph-paperclip-horizontal',
        subtitle: 'View or remove attachments in your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'ferramentas-pdf.html',
        name: 'PDF Multi Tool',
        icon: 'ph-pencil-ruler',
        subtitle: 'Full-featured PDF editor with page management.',
      },
      {
        href: import.meta.env.BASE_URL + 'camadas-pdf.html',
        name: 'PDF OCG',
        icon: 'ph-stack-simple',
        subtitle: 'View, toggle, add, and delete OCG layers in your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'extrair-tabelas-pdf.html',
        name: 'Extract Tables',
        icon: 'ph-table',
        subtitle: 'Extract tables from PDFs as CSV, JSON, or Markdown.',
      },
      {
        href: import.meta.env.BASE_URL + 'dividir-pdf.html',
        name: 'Split PDF',
        icon: 'ph-scissors',
        subtitle: 'Extract a range of pages into a new PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'dividir-paginas-pdf.html',
        name: 'Divide Pages',
        icon: 'ph-columns',
        subtitle: 'Divide pages horizontally or vertically.',
      },
      {
        href: import.meta.env.BASE_URL + 'extrair-paginas-pdf.html',
        name: 'Extract Pages',
        icon: 'ph-squares-four',
        subtitle: 'Save a selection of pages as new files.',
      },
      {
        href: import.meta.env.BASE_URL + 'excluir-paginas-pdf.html',
        name: 'Delete Pages',
        icon: 'ph-trash',
        subtitle: 'Remove specific pages from your document.',
      },
      {
        href: import.meta.env.BASE_URL + 'adicionar-pagina-branco-pdf.html',
        name: 'Add Blank Page',
        icon: 'ph-file-plus',
        subtitle: 'Insert an empty page anywhere in your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'inverter-paginas-pdf.html',
        name: 'Reverse Pages',
        icon: 'ph-sort-descending',
        subtitle: 'Flip the order of all pages in your document.',
      },
      {
        href: import.meta.env.BASE_URL + 'girar-pdf.html',
        name: 'Rotate PDF',
        icon: 'ph-arrow-clockwise',
        subtitle: 'Turn pages in 90-degree increments.',
      },
      {
        href: import.meta.env.BASE_URL + 'girar-paginas-pdf.html',
        name: 'Rotate by Custom Degrees',
        icon: 'ph-arrows-clockwise',
        subtitle: 'Rotate pages by any custom angle.',
      },
      {
        href: import.meta.env.BASE_URL + 'varias-paginas-por-folha-pdf.html',
        name: 'N-Up PDF',
        icon: 'ph-squares-four',
        subtitle: 'Arrange multiple pages onto a single sheet.',
      },
      {
        href: import.meta.env.BASE_URL + 'livreto-pdf.html',
        name: 'PDF Booklet',
        icon: 'ph-book-open',
        subtitle: 'Rearrange pages for double-sided booklet printing.',
      },
      {
        href: import.meta.env.BASE_URL + 'combinar-pagina-unica-pdf.html',
        name: 'Combine to Single Page',
        icon: 'ph-arrows-out-line-vertical',
        subtitle: 'Stitch all pages into one continuous scroll.',
      },
      {
        href: import.meta.env.BASE_URL + 'ver-metadados-pdf.html',
        name: 'View Metadata',
        icon: 'ph-info',
        subtitle: 'Inspect the hidden properties of your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'editar-metadados-pdf.html',
        name: 'Edit Metadata',
        icon: 'ph-file-code',
        subtitle: 'Change the author, title, and other properties.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-zip.html',
        name: 'PDFs to ZIP',
        icon: 'ph-file-zip',
        subtitle: 'Package multiple PDF files into a ZIP archive.',
      },
      {
        href: import.meta.env.BASE_URL + 'comparar-pdf.html',
        name: 'Compare PDFs',
        icon: 'ph-git-diff',
        subtitle: 'Compare two PDFs side by side.',
      },
      {
        href: import.meta.env.BASE_URL + 'poster-pdf.html',
        name: 'Posterize PDF',
        icon: 'ph-notepad',
        subtitle: 'Split a large page into multiple smaller pages.',
      },
    ],
  },
  {
    name: 'Optimize & Repair',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'comprimir-pdf.html',
        name: 'Compress PDF',
        icon: 'ph-lightning',
        subtitle: 'Reduce the file size of your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'pdf-para-pdfa.html',
        name: 'PDF to PDF/A',
        icon: 'ph-archive',
        subtitle: 'Convert PDF to PDF/A for long-term archiving.',
      },
      {
        href: import.meta.env.BASE_URL + 'ajustar-tamanho-pagina-pdf.html',
        name: 'Fix Page Size',
        icon: 'ph-ruler',
        subtitle: 'Standardize all pages to a uniform size.',
      },
      {
        href: import.meta.env.BASE_URL + 'otimizar-pdf-web.html',
        name: 'Linearize PDF',
        icon: 'ph-gauge',
        subtitle: 'Optimize PDF for fast web viewing.',
      },
      {
        href: import.meta.env.BASE_URL + 'dimensoes-pagina-pdf.html',
        name: 'Page Dimensions',
        icon: 'ph-ruler',
        subtitle: 'Analyze page size, orientation, and units.',
      },
      {
        href: import.meta.env.BASE_URL + 'desbloquear-pdf.html',
        name: 'Remove Restrictions',
        icon: 'ph-link-break',
        subtitle:
          'Remove password protection and security restrictions associated with digitally signed PDF files.',
      },
      {
        href: import.meta.env.BASE_URL + 'reparar-pdf.html',
        name: 'Repair PDF',
        icon: 'ph-wrench',
        subtitle: 'Recover data from corrupted or damaged PDF files.',
      },
      {
        href: import.meta.env.BASE_URL + 'rasterizar-pdf.html',
        name: 'Rasterize PDF',
        icon: 'ph-image',
        subtitle:
          'Convert PDF to image-based PDF. Flatten layers and remove selectable text.',
      },
      {
        href: import.meta.env.BASE_URL + 'endireitar-pdf.html',
        name: 'Deskew PDF',
        icon: 'ph-perspective',
        subtitle: 'Automatically straighten tilted scanned pages using OpenCV.',
      },
      {
        href: import.meta.env.BASE_URL + 'vetorizar-fontes-pdf.html',
        name: 'Font to Outline',
        icon: 'ph-text-outdent',
        subtitle:
          'Convert all fonts to vector outlines for consistent rendering.',
      },
    ],
  },
  {
    name: 'Secure PDF',
    tools: [
      {
        href: import.meta.env.BASE_URL + 'proteger-pdf-senha.html',
        name: 'Encrypt PDF',
        icon: 'ph-lock',
        subtitle: 'Lock your PDF by adding a password.',
      },
      {
        href: import.meta.env.BASE_URL + 'limpar-metadados-pdf.html',
        name: 'Sanitize PDF',
        icon: 'ph-broom',
        subtitle: 'Remove metadata, annotations, scripts, and more.',
      },
      {
        href: import.meta.env.BASE_URL + 'remover-senha-pdf.html',
        name: 'Decrypt PDF',
        icon: 'ph-lock-open',
        subtitle: 'Unlock PDF by removing password protection.',
      },
      {
        href: import.meta.env.BASE_URL + 'achatar-pdf.html',
        name: 'Flatten PDF',
        icon: 'ph-stack',
        subtitle: 'Make form fields and annotations non-editable.',
      },
      {
        href: import.meta.env.BASE_URL + 'remover-metadados-pdf.html',
        name: 'Remove Metadata',
        icon: 'ph-file-x',
        subtitle: 'Strip hidden data from your PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'alterar-permissoes-pdf.html',
        name: 'Change Permissions',
        icon: 'ph-shield-check',
        subtitle: 'Set or change user permissions on a PDF.',
      },
      {
        href: import.meta.env.BASE_URL + 'assinatura-digital-pdf.html',
        name: 'Digital Signature',
        icon: 'ph-certificate',
        subtitle:
          'Add a cryptographic digital signature using X.509 certificates.',
      },
      {
        href: import.meta.env.BASE_URL + 'validar-assinatura-pdf.html',
        name: 'Validate Signature',
        icon: 'ph-seal-check',
        subtitle: 'Verify digital signatures and view certificate details.',
      },
      {
        href: import.meta.env.BASE_URL + 'carimbo-tempo-pdf.html',
        name: 'Timestamp PDF',
        icon: 'ph-clock',
        subtitle:
          'Add an RFC 3161 document timestamp using a trusted TSA server.',
      },
    ],
  },
];

const getToolIdFromHref = (href: string): string => {
  const match = href.match(/\/([^/]+)\.html$/);
  return match?.[1] ?? href;
};

export const categories = baseCategories.map((category) => ({
  ...category,
  tools: category.tools.map((tool) => ({
    ...tool,
    id: getToolIdFromHref(tool.href),
  })),
}));
