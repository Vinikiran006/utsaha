/**
 * ═══════════════════════════════════════════════════════════════════
 * Google Apps Script — Utsaha Vaibhava Event Registration Handler
 * ═══════════════════════════════════════════════════════════════════
 *
 * HOW TO SET UP:
 * 1. Create a new Google Sheet
 * 2. Create one tab (sheet) for each event, named by event ID:
 *      tech-01, tech-02, tech-03, tech-04, tech-06,
 *      tech-07, tech-09, tech-10, tech-11
 * 3. In each tab, add headers in ROW 1 matching the field names
 *    (see HEADERS object below for exact column names per event)
 * 4. Go to Extensions → Apps Script → paste this code
 * 5. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and paste it in RegistrationForm.jsx
 *    (replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE)
 *
 * ═══════════════════════════════════════════════════════════════════
 */

// Column headers for each event sheet (Row 1)
/**
 * ═══════════════════════════════════════════════════════════════
 * Utsaha Vaibhava – Event Registration API
 * ═══════════════════════════════════════════════════════════════
 */

// ──────────────────────────────────────────────────────────────
// COLUMN HEADERS PER EVENT
// ──────────────────────────────────────────────────────────────

const HEADERS = {

  // 🎮 VALORANT (UPDATED STRUCTURE)
  'tech-01': [
    'Timestamp',
    'Team Name',
    'Leader Name',
    'Leader Phone',
    'Member 2 Name',
    'Member 3 Name',
    'Member 4 Name',
    'Member 5 Name',
    'UTR Number'
  ],

  'tech-02': [
    'Timestamp',
    'Team Name',
    'Leader Name',
    'Leader Phone',
    'Teammate 2',
    'Teammate 3',
    'Teammate 4',
    'UTR Number'
  ],

  'tech-03': [
    'Timestamp',
    'Participant Name',
    'Phone Number',
    'UTR Number'
  ],

  'tech-04': [
    'Timestamp',
    'Participant Name',
    'Phone Number',
    'UTR Number'
  ],

  'tech-06': [
    'Timestamp',
    'Participant Name',
    'Phone Number',
    'UTR Number'
  ],

  'tech-07': [
    'Timestamp',
    'Participant 1 Name',
    'Participant 1 Phone',
    'Participant 2 Name',
    'Participant 2 Phone',
    'UTR Number'
  ],

  'tech-09': [
    'Timestamp',
    'Team Name',
    'Member 1 Name',
    'Member 1 Phone',
    'Member 2 Name',
    'Member 2 Phone',
    'Member 3 Name',
    'Member 3 Phone',
    'Member 4 Name',
    'Member 4 Phone',
    'UTR Number'
  ],

  'tech-10': [
    'Timestamp',
    'Team Name',
    'Leader Name',
    'Leader Phone',
    'Teammate 2',
    'Teammate 3',
    'Teammate 4',
    'UTR Number'
  ],

  'tech-11': [
    'Timestamp',
    'Team Name',
    'Member 1 Name',
    'Member 1 Phone',
    'Member 2 Name',
    'Member 2 Phone',
    'Member 3 Name',
    'Member 3 Phone',
    'Member 4 Name',
    'Member 4 Phone',
    'UTR Number'
  ]
};


// ──────────────────────────────────────────────────────────────
// FIELD MAPPING PER EVENT
// ──────────────────────────────────────────────────────────────

const FIELD_MAP = {

  // 🎮 VALORANT (UPDATED)
  'tech-01': (d) => [
    d.timestamp || new Date().toISOString(),
    d.teamName || '',
    d.leaderName || '',
    d.leaderPhone || '',
    d.member2Name || '',
    d.member3Name || '',
    d.member4Name || '',
    d.member5Name || '',
    d.utrNumber || ''
  ],

  'tech-02': (d) => [
    d.timestamp,
    d.teamName,
    d.leaderName,
    d.leaderPhone,
    d.teammate2,
    d.teammate3,
    d.teammate4,
    d.utrNumber
  ],

  'tech-03': (d) => [
    d.timestamp,
    d.participantName,
    d.participantPhone,
    d.utrNumber
  ],

  'tech-04': (d) => [
    d.timestamp,
    d.participantName,
    d.participantPhone,
    d.utrNumber
  ],

  'tech-06': (d) => [
    d.timestamp,
    d.participantName,
    d.participantPhone,
    d.utrNumber
  ],

  'tech-07': (d) => [
    d.timestamp,
    d.participant1Name,
    d.participant1Phone,
    d.participant2Name,
    d.participant2Phone,
    d.utrNumber
  ],

  'tech-09': (d) => [
    d.timestamp,
    d.teamName,
    d.member1Name,
    d.member1Phone,
    d.member2Name,
    d.member2Phone,
    d.member3Name,
    d.member3Phone,
    d.member4Name,
    d.member4Phone,
    d.utrNumber
  ],

  'tech-10': (d) => [
    d.timestamp,
    d.teamName,
    d.leaderName,
    d.leaderPhone,
    d.teammate2,
    d.teammate3,
    d.teammate4,
    d.utrNumber
  ],

  'tech-11': (d) => [
    d.timestamp,
    d.teamName,
    d.member1Name,
    d.member1Phone,
    d.member2Name,
    d.member2Phone,
    d.member3Name,
    d.member3Phone,
    d.member4Name,
    d.member4Phone,
    d.utrNumber
  ]
};


// ──────────────────────────────────────────────────────────────
// HANDLE POST REQUEST (FORM SUBMISSION)
// ──────────────────────────────────────────────────────────────

function doPost(e) {
  try {

    const data = JSON.parse(e.postData.contents);
    const eventId = data.eventId;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(eventId);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(eventId);
      const headers = HEADERS[eventId] || ['Timestamp', 'Event ID', 'Raw Data'];
      sheet.getRange(1, 1, 1, headers.length)
           .setValues([headers])
           .setFontWeight('bold');
    }

    const mapper = FIELD_MAP[eventId];
    let row;

    if (mapper) {
      row = mapper(data);
    } else {
      // Fallback (unknown event)
      row = [
        data.timestamp || new Date().toISOString(),
        eventId,
        JSON.stringify(data)
      ];
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        eventId: eventId
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// ──────────────────────────────────────────────────────────────
// HEALTH CHECK
// ──────────────────────────────────────────────────────────────

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Utsaha Registration API is live.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}