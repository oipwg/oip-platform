import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import knownTemplates from '../../../templates/knownTemplates'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    wordBreak: 'break-word',
    borderTop: `1px solid ${theme.palette.greyscale(0.3)}`,
    padding: 10,
    fontSize: 12,
    boxSizing: 'border-box'
  },
  tableData: {
    width: '100%'
  },
  templateDataRow: {
    // width: 30
    margin: [7, 0]
  },
  templateName: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: '600',
    color: 'white',
    padding: [3, 4]
  },
  recordField: {
    fontWeight: '600',
    color: theme.palette.greyscale(0.9),
    padding: [2, 4]
  },
  recordFieldRow: {
    margin: [7, 16]
  }
})

const RecordRow = ({
  classes,
  record,
  meta
}) => {
  const { details } = record // tags, payment, permissions
  return <tr
    key={meta.txid}
    className={classes.root}
  >
    <td className={classes.tableData}>
      {Object.keys(details).map((tmpl, i) => {
        return <TemplateData
          classes={classes}
          tmpl={tmpl}
          details={details[tmpl]}
          keyIndex={i}
        />
      })}
      {meta.signed_by && <>
        <span className={classes.templateName}>signed_by:</span><span> {meta.signed_by}</span>
      </>}
    </td>
  </tr>
}

const TemplateData = ({
  classes,
  tmpl,
  details,
  keyIndex
}) => {
  let templateName
  if (knownTemplates[tmpl]) {
    templateName = knownTemplates[tmpl].friendly_name
  } else {
    templateName = 'Unknown Template'
  }
  return <div key={keyIndex} className={classes.templateDataRow}>
    <span className={classes.templateName}>{templateName}:</span>
    <span> {tmpl}</span>
    {Object.keys(details).map((recordField, i) => {
      return <RecordField
        classes={classes}
        keyIndex={i}
        recordField={recordField}
        recordFieldData={details[recordField]}
      />
    })}
  </div>
}

const RecordField = ({
  classes,
  keyIndex,
  recordField,
  recordFieldData
}) => {
  if (recordFieldData.raw) {
    recordFieldData = recordFieldData.raw
  }
  return <div className={classes.recordFieldRow} key={keyIndex}>
    <span className={classes.recordField}>{recordField}:</span>
    <span> {recordFieldData}</span>
  </div>
}

RecordRow.propTypes = {
  classes: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default withStyles(styles)(RecordRow)