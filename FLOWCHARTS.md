# Medical Second Opinion Platform - Flowcharts

## 🎯 Key Business Process Flowcharts

### 1. Complete Patient Journey Flowchart

```mermaid
flowchart TD
    Start([Patient Arrives]) --> Landing[Landing Page]
    Landing --> Info[Step 1: Personal Information]
    Info --> |Valid| Upload[Step 2: Upload Documents]
    Info --> |Invalid| Info
    
    Upload --> |Files Added| Context[Step 3: Medical Context]
    Upload --> |No Files| Context
    Context --> Review[Step 4: Review Information]
    
    Review --> |Edit Requested| Edit{Which Step?}
    Edit --> |Step 1| Info
    Edit --> |Step 2| Upload
    Edit --> |Step 3| Context
    
    Review --> |Continue| Payment[Step 5: Payment]
    Payment --> |Success| Consent[Step 6: Terms & Consent]
    Payment --> |Failed| Payment
    
    Consent --> |Accepted| Submit[Step 7: Submit Case]
    Consent --> |Not Accepted| Consent
    
    Submit --> Generate[Generate Case Number]
    Generate --> Store[Store in Database]
    Store --> Notify[Send Notifications]
    Notify --> Confirmation[Confirmation Screen]
    Confirmation --> End([Journey Complete])
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Generate fill:#fff3e0
    style Confirmation fill:#f3e5f5
```

### 2. File Upload Process Flowchart

```mermaid
flowchart TD
    Start([User Selects Files]) --> Validate[Validate File Types]
    Validate --> |Valid| Size[Check File Size]
    Validate --> |Invalid| Error[Show Error Message]
    
    Size --> |Under Limit| Count[Check File Count]
    Size --> |Over Limit| Error
    
    Count --> |Under Limit| Upload[Request Upload URLs]
    Count --> |Over Limit| Error
    
    Upload --> |Success| Progress[Show Upload Progress]
    Upload --> |Failed| Retry[Retry Upload]
    
    Progress --> |Complete| Classify[Classify Documents]
    Progress --> |Failed| Retry
    
    Classify --> |All Classified| Store[Store File Metadata]
    Classify --> |Not Complete| Classify
    
    Store --> Success[Upload Complete]
    Retry --> Upload
    
    Error --> Start
    Success --> End([Files Ready])
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Error fill:#ffebee
    style Success fill:#e8f5e8
```

### 3. Case Assignment and Review Flowchart

```mermaid
flowchart TD
    Start([Case Submitted]) --> AI[Trigger AI Analysis]
    AI --> |Complete| Queue[Add to Review Queue]
    AI --> |Failed| Queue
    
    Queue --> Available[Available for Assignment]
    Available --> Admin[Admin Reviews Cases]
    
    Admin --> |Assign| Professional[Assign to Professional]
    Admin --> |Hold| Hold[Put on Hold]
    
    Professional --> |Accept| Review[Start Case Review]
    Professional --> |Decline| Available
    
    Review --> Documents[Access Patient Documents]
    Documents --> AIResults[Review AI Analysis]
    AIResults --> Opinion[Create Medical Opinion]
    
    Opinion --> Draft[Draft Opinion]
    Draft --> Peer[Submit for Peer Review]
    
    Peer --> |Approved| Final[Finalize Opinion]
    Peer --> |Revisions Needed| Revise[Request Revisions]
    
    Revise --> Opinion
    Final --> Store[Store Final Opinion]
    Store --> Notify[Notify Customer]
    Notify --> Payment[Process Professional Payment]
    Payment --> Complete[Case Complete]
    
    Hold --> Available
    
    style Start fill:#e1f5fe
    style Complete fill:#c8e6c9
    style Hold fill:#fff3e0
    style Revise fill:#ffebee
```

### 4. Customer Portal Access Flowchart

```mermaid
flowchart TD
    Start([Customer Visits Portal]) --> Login{Has Account?}
    Login --> |Yes| Credentials[Enter Credentials]
    Login --> |No| Register[Create Account]
    
    Register --> |Success| Credentials
    Register --> |Failed| Register
    
    Credentials --> |Valid| Dashboard[Access Dashboard]
    Credentials --> |Invalid| Credentials
    
    Dashboard --> Cases[View Cases]
    Cases --> |Has Cases| Status[Check Case Status]
    Cases --> |No Cases| Empty[Show Empty State]
    
    Status --> |In Progress| Progress[Show Progress]
    Status --> |Complete| Download[Download Opinion]
    Status --> |Pending| Pending[Show Pending Status]
    
    Progress --> Updates[Receive Updates]
    Pending --> Updates
    
    Download --> |Success| Complete[Download Complete]
    Download --> |Failed| Retry[Retry Download]
    
    Retry --> Download
    Empty --> End([Portal Access Complete])
    Complete --> End
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Download fill:#e8f5e8
    style Retry fill:#fff3e0
```

### 5. Professional Application and Vetting Flowchart

```mermaid
flowchart TD
    Start([Professional Applies]) --> Application[Submit Application]
    Application --> Documents[Upload Credentials]
    Documents --> Review[Admin Reviews Application]
    
    Review --> |Approved| Approve[Approve Professional]
    Review --> |Rejected| Reject[Reject Application]
    Review --> |More Info| Request[Request More Information]
    
    Request --> Response[Professional Responds]
    Response --> Review
    
    Approve --> Onboard[Onboard Professional]
    Onboard --> Active[Professional Active]
    Active --> Cases[Can Accept Cases]
    
    Reject --> Notify[Notify Rejection]
    Notify --> End([Application Closed])
    
    Cases --> End
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Approve fill:#e8f5e8
    style Reject fill:#ffebee
```

### 6. Payment Processing Flowchart

```mermaid
flowchart TD
    Start([Payment Initiated]) --> Validate[Validate Payment Data]
    Validate --> |Valid| Process[Process Payment]
    Validate --> |Invalid| Error[Show Error]
    
    Process --> |Success| Confirm[Payment Confirmed]
    Process --> |Failed| Retry[Retry Payment]
    
    Confirm --> Record[Record Payment]
    Record --> Notify[Send Confirmation]
    Notify --> Complete[Payment Complete]
    
    Retry --> |Attempts Left| Process
    Retry --> |Max Attempts| Failed[Payment Failed]
    
    Error --> Start
    Failed --> End([Payment Failed])
    Complete --> End
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Confirm fill:#e8f5e8
    style Failed fill:#ffebee
```

### 7. Error Handling and Recovery Flowchart

```mermaid
flowchart TD
    Start([Error Occurs]) --> Log[Log Error]
    Log --> Type{Error Type?}
    
    Type --> |Validation| Validation[Show Validation Error]
    Type --> |Network| Network[Show Network Error]
    Type --> |Server| Server[Show Server Error]
    Type --> |Unknown| Unknown[Show Generic Error]
    
    Validation --> Retry[Allow Retry]
    Network --> Retry
    Server --> Retry
    Unknown --> Retry
    
    Retry --> |User Retries| Action[Retry Action]
    Retry --> |User Cancels| Cancel[Cancel Operation]
    
    Action --> |Success| Success[Operation Complete]
    Action --> |Still Fails| MaxAttempts{Max Attempts?}
    
    MaxAttempts --> |Yes| Fallback[Show Fallback Option]
    MaxAttempts --> |No| Action
    
    Fallback --> Alternative[Provide Alternative]
    Cancel --> End([Operation Cancelled])
    Success --> End
    
    style Start fill:#ffebee
    style End fill:#c8e6c9
    style Success fill:#e8f5e8
    style Fallback fill:#fff3e0
```

### 8. Data Flow Between Modules Flowchart

```mermaid
flowchart TD
    Start([Case Submission]) --> Repository[Repository Module]
    Repository --> AI[AI Analysis Service]
    AI --> Repository
    
    Repository --> Customer[Customer Lifecycle Module]
    Customer --> Notify[Notification Service]
    
    Repository --> Invoicing[Invoicing Module]
    Invoicing --> Payment[Payment Processing]
    
    Repository --> Professional[Professional Assignment]
    Professional --> Review[Case Review Module]
    
    Review --> Repository
    Review --> Invoicing
    Review --> Customer
    
    Notify --> Email[Email Service]
    Notify --> SMS[SMS Service]
    
    Payment --> Confirmation[Payment Confirmation]
    Confirmation --> Customer
    
    style Start fill:#e1f5fe
    style Repository fill:#e3f2fd
    style Customer fill:#f3e5f5
    style Invoicing fill:#fff3e0
    style Review fill:#e8f5e8
```

### 9. Security and Authentication Flowchart

```mermaid
flowchart TD
    Start([User Access Request]) --> Auth{Authentication Required?}
    Auth --> |Yes| Login[Login Process]
    Auth --> |No| Public[Public Access]
    
    Login --> Credentials[Enter Credentials]
    Credentials --> Validate[Validate Credentials]
    
    Validate --> |Valid| Token[Generate JWT Token]
    Validate --> |Invalid| Retry[Retry Login]
    
    Token --> Role[Check User Role]
    Role --> |Patient| PatientAccess[Patient Access]
    Role --> |Customer| CustomerAccess[Customer Access]
    Role --> |Professional| ProfessionalAccess[Professional Access]
    Role --> |Admin| AdminAccess[Admin Access]
    
    PatientAccess --> Session[Maintain Session]
    CustomerAccess --> Session
    ProfessionalAccess --> Session
    AdminAccess --> Session
    
    Session --> Timeout{Session Valid?}
    Timeout --> |Yes| Continue[Continue Access]
    Timeout --> |No| Refresh[Refresh Token]
    
    Refresh --> |Success| Continue
    Refresh --> |Failed| Login
    
    Retry --> |Max Attempts| Lock[Account Locked]
    Lock --> Admin[Admin Intervention]
    
    Public --> End([Access Granted])
    Continue --> End
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Lock fill:#ffebee
    style Token fill:#e8f5e8
```

### 10. System Health and Monitoring Flowchart

```mermaid
flowchart TD
    Start([System Monitoring]) --> Health[Health Check]
    Health --> |Healthy| Normal[Normal Operation]
    Health --> |Warning| Alert[Send Alert]
    Health --> |Critical| Emergency[Emergency Response]
    
    Normal --> Metrics[Collect Metrics]
    Metrics --> Store[Store Data]
    Store --> Report[Generate Reports]
    
    Alert --> Notify[Notify Administrators]
    Notify --> Action[Take Action]
    Action --> Health
    
    Emergency --> Shutdown[Graceful Shutdown]
    Shutdown --> Backup[Activate Backup]
    Backup --> Recovery[Recovery Process]
    Recovery --> Health
    
    Report --> Dashboard[Update Dashboard]
    Dashboard --> End([Monitoring Complete])
    
    style Start fill:#e1f5fe
    style End fill:#c8e6c9
    style Emergency fill:#ffebee
    style Normal fill:#e8f5e8
```

## 📊 Decision Tree Diagrams

### 1. Case Assignment Decision Tree

```mermaid
graph TD
    A[New Case Available] --> B{AI Analysis Complete?}
    B -->|Yes| C{Professional Available?}
    B -->|No| D[Wait for AI Analysis]
    C -->|Yes| E{Specialty Match?}
    C -->|No| F[Queue Case]
    E -->|Yes| G{Workload Acceptable?}
    E -->|No| H[Find Different Professional]
    G -->|Yes| I[Assign Case]
    G -->|No| J[Find Available Professional]
    D --> B
    F --> C
    H --> C
    J --> C
    I --> K[Case Assigned]
    
    style A fill:#e1f5fe
    style K fill:#c8e6c9
```

### 2. File Upload Decision Tree

```mermaid
graph TD
    A[File Selected] --> B{File Type Valid?}
    B -->|Yes| C{File Size OK?}
    B -->|No| D[Reject File]
    C -->|Yes| E{File Count OK?}
    C -->|No| F[File Too Large]
    E -->|Yes| G{Storage Available?}
    E -->|No| H[Too Many Files]
    G -->|Yes| I[Upload File]
    G -->|No| J[Storage Full]
    I --> K[File Uploaded]
    D --> L[Show Error]
    F --> L
    H --> L
    J --> L
    
    style A fill:#e1f5fe
    style K fill:#c8e6c9
    style L fill:#ffebee
```

## 🔄 State Machine Diagrams

### 1. Case State Machine

```mermaid
stateDiagram-v2
    [*] --> Submitted
    Submitted --> UnderReview
    Submitted --> Rejected
    UnderReview --> Assigned
    UnderReview --> OnHold
    Assigned --> InProgress
    InProgress --> PeerReview
    PeerReview --> Completed
    PeerReview --> Revision
    Revision --> InProgress
    OnHold --> Assigned
    OnHold --> Rejected
    Completed --> [*]
    Rejected --> [*]
```

### 2. Professional Status State Machine

```mermaid
stateDiagram-v2
    [*] --> Applied
    Applied --> UnderReview
    Applied --> Rejected
    UnderReview --> Approved
    UnderReview --> MoreInfo
    MoreInfo --> UnderReview
    Approved --> Active
    Active --> Suspended
    Active --> Inactive
    Suspended --> Active
    Suspended --> Terminated
    Inactive --> Active
    Rejected --> [*]
    Terminated --> [*]
```

---

*These flowcharts provide detailed visual representations of the key business processes, decision points, and system interactions within the Medical Second Opinion Platform.*
